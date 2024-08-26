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
        description: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            default: null,
        },
        brand: {
            type: String,
            required: true,
        },
        returnDays: {
            type: Number,
            default: null,
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
        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        images: [
            {
                secure_url: {
                    type: String,
                },
                public_id: {
                    type: String,
                },
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
