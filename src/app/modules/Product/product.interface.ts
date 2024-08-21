import { Types } from 'mongoose';

export type TProduct = {
    name: string;
    images: string[];
    price: number;
    stock: number;
    quantity: number;
    categories: Types.ObjectId[] | string[];
    isDeleted: boolean;
    ratings: number;
};
