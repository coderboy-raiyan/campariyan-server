import { Types } from 'mongoose';

export type TProduct = {
    name: string;
    images: string[];
    price: number;
    stock: number;
    quantity: number;
    category: Types.ObjectId[] | string[];
    isDeleted: boolean;
    ratings: number;
};
