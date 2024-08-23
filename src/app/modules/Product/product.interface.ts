import { Types } from 'mongoose';

export type TProductReviews = {
    ratings: number;
    totalRatings: number;
};

export type TProduct = {
    name: string;
    images: string[];
    reviews: TProductReviews;
    price: number;
    stock: number;
    quantity: number;
    categories: Types.ObjectId[] | string[];
    isDeleted: boolean;
};
