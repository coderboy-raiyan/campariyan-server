import { Types } from 'mongoose';

export type TReview = {
    description: string;
    rating: number;
    customer: Types.ObjectId | string;
    product: Types.ObjectId | string;
};
