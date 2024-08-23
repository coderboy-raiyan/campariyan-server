import { model, Schema } from 'mongoose';

import { TProduct, TProductReviews } from './product.interface';

const reviewSchema = new Schema<TProductReviews>({
    ratings: {
        type: Number,
        default: 0,
    },
    totalRatings: {
        type: Number,
        default: 0,
    },
});

const productSchema = new Schema<TProduct>(
    {
        name: {
            type: String,
            required: true,
        },
        reviews: {
            type: reviewSchema,
        },
        price: {
            type: Number,
            required: true,
        },
        categories: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Category',
                required: true,
            },
        ],
        quantity: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        images: [
            {
                type: String,
                required: true,
            },
        ],
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

productSchema.pre('find', function () {
    this.find({ isDeleted: false });
});

const Product = model<TProduct>('Product', productSchema);

export default Product;
