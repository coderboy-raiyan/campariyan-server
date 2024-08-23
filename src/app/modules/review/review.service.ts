import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import Product from '../Product/product.model';
import { TReview } from './review.interface';
import Review from './review.model';

const ObjectId = mongoose.Types.ObjectId;

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

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const review = await Review.create([payload], { session });

        const generateRatings = await Review.aggregate(
            [
                {
                    $match: {
                        product: new ObjectId(payload?.product),
                    },
                },
                {
                    $group: {
                        _id: null,
                        ratings: { $avg: '$rating' },
                        totalRatings: { $sum: 1 },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        ratings: 1,
                        totalRatings: 1,
                    },
                },
            ],
            { session }
        );

        const updateProductRatings = await Product.findByIdAndUpdate(
            payload?.product,
            {
                reviews: {
                    ratings: generateRatings[0].ratings,
                    totalRatings: generateRatings[0].totalRatings,
                },
            },
            { session }
        );

        if (!updateProductRatings) {
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to update review!');
        }

        await session.commitTransaction();
        await session.endSession();

        return review[0];
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error);
    }
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
