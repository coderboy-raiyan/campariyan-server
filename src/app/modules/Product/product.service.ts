import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import uploadFileOnCloudinary, { deleteFilesOnCloudinary } from '../../utils/cloudinary';
import Category from '../category/category.model';
import { ProductConstants } from './product.constant';
import { TProduct } from './product.interface';
import Product from './product.model';

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
    const { searchTerm, category } = query;

    const productQuery = new QueryBuilder(Product, query)
        .search(ProductConstants.productSearchAbleFields)
        .filter(['category'])
        .paginate()
        .fields()
        .sort();

    if (searchTerm) {
        const findProductCategory = await Category.find(
            {
                slug: { $regex: searchTerm, $options: 'i' },
            },
            { _id: 1 }
        );

        productQuery.QueryModel = productQuery.QueryModel.find({
            $or: [
                {
                    categories: {
                        $in: findProductCategory.map((cate) => cate?._id.toString()),
                    },
                },
            ],
        });
    }

    if (category) {
        const findProductCategory = await Category.find(
            {
                slug: category,
            },
            { _id: 1 }
        );

        productQuery.QueryModel = productQuery.QueryModel.find({
            categories: {
                $in: findProductCategory.map((cate) => cate?._id.toString()),
            },
        });
    }

    const product = await productQuery.QueryModel;

    return product;
};
const createProductIntoDB = async (files: Express.Multer.File[], payload: TProduct) => {
    try {
        const images = [];

        for (const file of files) {
            const url = await uploadFileOnCloudinary(file.path);
            images.push({ secure_url: url?.secure_url, public_id: url?.public_id });
        }

        const product = await Product.create({
            ...payload,
            images,
            reviews: {
                ratings: 0,
                totalRatings: 0,
            },
        });
        return product;
    } catch (error) {
        throw new Error(error);
    }
};

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
    const { categories, ...restObj } = payload;

    const product = await Product.findById(id);

    if (!product) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Product not found!');
    }

    if (categories?.length) {
        const productCategories = product.categories.map((id) => id.toString());
        const deleteCategories = productCategories.filter((id) => !categories.includes(id));
        const newCategories = categories.filter((id) => !productCategories.includes(id));

        await Product.findByIdAndUpdate(
            id,
            {
                $pull: {
                    categories: { $in: deleteCategories },
                },
            },
            { new: true }
        );

        await Product.findByIdAndUpdate(
            id,
            {
                $push: {
                    categories: { $each: newCategories },
                },
            },
            { new: true }
        );
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, restObj, { new: true });

    return updatedProduct;
};

const deleteProductFromDB = async (id: string) => {
    try {
        const deletedProduct = await Product.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );

        if (!deletedProduct) {
            throw new AppError(StatusCodes.NOT_FOUND, 'Product not found!');
        }

        const deletedImages = deletedProduct?.images;

        for (const img of deletedImages) {
            await deleteFilesOnCloudinary(img.public_id);
        }
        return deletedProduct;
    } catch (error) {
        throw new Error(error);
    }
};

export const ProductServices = {
    createProductIntoDB,
    updateProductIntoDB,
    getAllProductsFromDB,
    deleteProductFromDB,
};
