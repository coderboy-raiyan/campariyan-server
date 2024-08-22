import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TReview } from './review.interface';
import Review from './review.model';

const createReviewIntoDB = async (payload: TReview) => {
    const isReviewExists = await Review.findOne({
        customer: payload?.customer,
        product: payload?.product,
    });

    if (isReviewExists) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            'You are not allowed to give more than one review!'
        );
    }

    const review = await Review.create(payload);

    return review;
};

const getAllReviewsFromDB = async () => {
    const reviews = await Review.find({}).populate('customer product');
    return reviews;
};

const updateReviewIntoDB = async (id: string, payload: Partial<TReview>) => {
    const review = await Review.findByIdAndUpdate(
        id,
        {
            description: payload?.description,
            rating: payload?.rating,
        },
        { new: true }
    );

    return review;
};
const deleteReviewFromDB = async (id: string) => {
    const review = await Review.findByIdAndDelete(id);
    return review;
};

export const ReviewServices = {
    createReviewIntoDB,
    getAllReviewsFromDB,
    updateReviewIntoDB,
    deleteReviewFromDB,
};
