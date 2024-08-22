import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductServices } from './product.service';

const getAllProducts = catchAsync(async (req, res) => {
    const result = await ProductServices.getAllProductsFromDB();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Products retrieved successfully',
        data: result,
    });
});
const createProduct = catchAsync(async (req, res) => {
    const result = await ProductServices.createProductIntoDB(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Product created successfully',
        data: result,
    });
});
const updateProduct = catchAsync(async (req, res) => {
    const result = await ProductServices.updateProductIntoDB(req.params.id, req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Product updated successfully',
        data: result,
    });
});

export const ProductControllers = {
    createProduct,
    updateProduct,
    getAllProducts,
};
