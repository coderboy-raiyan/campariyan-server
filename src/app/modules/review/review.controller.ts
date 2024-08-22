import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReviewServices } from './review.service';

const createReview = catchAsync(async (req, res) => {
    const result = await ReviewServices.createReviewIntoDB(req.body);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Review created successfully',
        data: result,
    });
});
const updateReview = catchAsync(async (req, res) => {
    const result = await ReviewServices.updateReviewIntoDB(req.params.id, req.body);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Review updated successfully',
        data: result,
    });
});
const getAllReviews = catchAsync(async (req, res) => {
    const result = await ReviewServices.getAllReviewsFromDB();
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Reviews retrieved successfully',
        data: result,
    });
});
const deleteReview = catchAsync(async (req, res) => {
    const result = await ReviewServices.deleteReviewFromDB(req.params.id);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Review deleted successfully',
        data: result,
    });
});

export const ReviewController = {
    createReview,
    updateReview,
    getAllReviews,
    deleteReview,
};
