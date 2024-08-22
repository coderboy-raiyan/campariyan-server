import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TProduct } from './product.interface';
import Product from './product.model';

const getAllProductsFromDB = async () => {
    const product = await Product.find({}).populate('categories');
    return product;
};
const createProductIntoDB = async (payload: TProduct) => {
    const product = await Product.create(payload);
    return product;
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
    const deletedProduct = await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return deletedProduct;
};

export const ProductServices = {
    createProductIntoDB,
    updateProductIntoDB,
    getAllProductsFromDB,
    deleteProductFromDB,
};
