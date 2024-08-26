import { z } from 'zod';
import { OrderConstants } from './order.constant';

const orderedProductsSchema = z.object({
    name: z.string(),
    productOriginalRef: z.string(),
    price: z.number().min(0),
    description: z.string(),
    stock: z.number().min(0),
    brand: z.string(),
    color: z.string(),
    images: z.array(z.string()),
});

const createOrderValidationSchema = z.object({
    body: z.object({
        paymentMethod: z.enum(
            Object.values(OrderConstants.PaymentMethods) as [string, ...string[]]
        ),
        products: z.array(orderedProductsSchema),
        customer: z.string(),
    }),
});

export const OrderValidations = {
    createOrderValidationSchema,
};
