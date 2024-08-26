import { model, Schema } from 'mongoose';
import { OrderConstants } from './order.constant';
import { TOrder, TOrderedProducts } from './order.interface';

const orderedProductSchema = new Schema<TOrderedProducts>({
    name: {
        type: String,
        required: true,
    },
    productOriginalRef: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    images: [],
});

const orderSchema = new Schema<TOrder>(
    {
        paymentMethod: {
            type: String,
            enum: Object.values(OrderConstants.PaymentMethods),
            required: true,
        },
        orderStatus: {
            type: String,
            enum: Object.values(OrderConstants.OrderStatus),
            default: 'pending',
        },
        products: [
            {
                type: orderedProductSchema,
                required: true,
            },
        ],
        customer: {
            type: Schema.Types.ObjectId,
            ref: 'Customer',
            required: true,
        },
        paymentResponse: {},
    },
    { timestamps: true }
);

const Order = model<TOrder>('Order', orderSchema);

export default Order;
