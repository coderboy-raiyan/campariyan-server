import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>({
    name: {
        type: String,
        required: true,
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
});

const Product = model<TProduct>('Product', productSchema);

export default Product;
