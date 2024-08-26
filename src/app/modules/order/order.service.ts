import { StatusCodes } from 'http-status-codes';
import Stripe from 'stripe';
import { config } from '../../config';
import AppError from '../../errors/AppError';
import Customer from '../customer/customer.model';
import Product from '../Product/product.model';
import { TOrder } from './order.interface';
import Order from './order.model';

const stripe = new Stripe(config.STRIPE_SECRET_KEY);

const createOrderIntoDB = async (payload: TOrder) => {
    const { products, customer: customerId } = payload;

    const customer = await Customer.findById(customerId);

    if (!customer) {
        throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
    }

    const line_items = products.map((product) => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: product?.name,
                description: product?.description,
                images: product?.images,
            },
            unit_amount: product?.price * 100,
        },
        quantity: product?.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
        line_items,
        customer_email: customer?.email,
        mode: 'payment',
        success_url: `${config.CORS_ORIGIN_URL}/checkout/success`,
        cancel_url: `${config.CORS_ORIGIN_URL}/checkout/canceled`,
    });

    for (const product of products) {
        await Product.findByIdAndUpdate(product?.productOriginalRef, {
            $inc: { stock: -product?.quantity },
        });
    }

    const order = await Order.create({ ...payload, paymentResponse: session });

    return {
        id: session?.id,
        total_amount: session?.amount_total,
        order,
    };
};

export const OrderServices = {
    createOrderIntoDB,
};
