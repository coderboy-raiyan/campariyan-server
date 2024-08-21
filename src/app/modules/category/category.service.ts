import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import slugify from 'slugify';
import AppError from '../../errors/AppError';
import Product from '../Product/product.model';
import { TCategory } from './category.interface';
import Category from './category.model';

const createCategoryInToDB = async (payload: TCategory) => {
    const slug = slugify(payload.name, {
        lower: true,
        remove: undefined,
        replacement: '-',
        trim: true,
    });

    const isCategoryExists = await Category.findOne({ slug });

    if (isCategoryExists) {
        throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Category already exists!');
    }

    const category = await Category.create({ name: payload.name, slug });

    return category;
};

const updateCategoryInToDB = async (id: string, payload: TCategory) => {
    const isCategoryExists = await Category.findById(id);

    if (!isCategoryExists) {
        throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Category does not exists!');
    }

    const slug = slugify(payload.name, {
        lower: true,
        remove: undefined,
        replacement: '-',
        trim: true,
    });

    const category = await Category.findByIdAndUpdate(
        id,
        { name: payload.name, slug },
        { new: true }
    );

    return category;
};

const deleteCategoryFromDB = async (id: string) => {
    const category = await Category.findById(id);

    if (!category) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Category not found!');
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const deletedCategory = await Category.findByIdAndDelete(id, { session, new: true });

        if (!deletedCategory) {
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Category couldn't  deleted");
        }

        const deletedCategoryFromProduct = await Product.updateMany(
            { categories: category?._id },
            {
                $pull: {
                    categories: category?._id,
                },
            },
            { session }
        );

        if (!deletedCategoryFromProduct) {
            throw new AppError(
                StatusCodes.INTERNAL_SERVER_ERROR,
                "Categories couldn't deleted from products"
            );
        }

        await session.commitTransaction();
        await session.endSession();

        return {
            category: deletedCategory,
            categoryRemovedCount: deletedCategoryFromProduct.modifiedCount,
        };
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();

        throw new Error(error);
    }
};

export const CategoryServices = {
    createCategoryInToDB,
    updateCategoryInToDB,
    deleteCategoryFromDB,
};
