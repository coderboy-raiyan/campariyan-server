import { Types } from 'mongoose';

export type TProductReviews = {
    ratings: number;
    totalRatings: number;
};

export type TProduct = {
    name: string;
    images: {
        secure_url: string;
        public_id: string;
    }[];
    reviews: TProductReviews;
    price: number;
    stock: number;
    quantity: number;
    categories: Types.ObjectId[] | string[];
    isDeleted: boolean;
};
