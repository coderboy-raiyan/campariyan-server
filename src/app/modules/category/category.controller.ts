import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CategoryServices } from './category.service';

const getAllCategories = catchAsync(async (req, res) => {
    const result = await CategoryServices.getAllCategoriesFromDB();
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Categories retrieved successfully',
        data: result,
    });
});
const createCategory = catchAsync(async (req, res) => {
    const result = await CategoryServices.createCategoryInToDB(req.body);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Category created successfully',
        data: result,
    });
});
const updateCategory = catchAsync(async (req, res) => {
    const result = await CategoryServices.updateCategoryInToDB(req.params.id, req.body);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Category updated successfully',
        data: result,
    });
});
const deleteCategory = catchAsync(async (req, res) => {
    const result = await CategoryServices.deleteCategoryFromDB(req.params.id);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Category deleted successfully',
        data: result,
    });
});

export const CategoryControllers = {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
};
