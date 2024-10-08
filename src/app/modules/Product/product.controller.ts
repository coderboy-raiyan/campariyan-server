import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductServices } from './product.service';

const getAllProducts = catchAsync(async (req, res) => {
    const result = await ProductServices.getAllProductsFromDB(req.query);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Products retrieved successfully',
        data: result,
    });
});
const getSingleProduct = catchAsync(async (req, res) => {
    const result = await ProductServices.getSingleProductFromDB(req.params.id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Product retrieved successfully',
        data: result,
    });
});
const createProduct = catchAsync(async (req, res) => {
    const result = await ProductServices.createProductIntoDB(
        req.files as Express.Multer.File[],
        req.body
    );
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
const deleteProduct = catchAsync(async (req, res) => {
    const result = await ProductServices.deleteProductFromDB(req.params.id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Product deleted successfully',
        data: result,
    });
});

export const ProductControllers = {
    createProduct,
    updateProduct,
    getAllProducts,
    deleteProduct,
    getSingleProduct,
};
