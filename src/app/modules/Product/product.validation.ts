import { z } from 'zod';

const createProductValidationSchema = z.object({
    name: z.string(),
    price: z.number().min(0),
    categories: z.string().or(z.array(z.string())),
    quantity: z.number().min(0),
    stock: z.number().min(0),
    brand: z.string(),
    description: z.string(),
    color: z.string().optional(),
});
const updateProductValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        price: z.number().min(0).optional(),
        categories: z.string().or(z.array(z.string())).optional(),
        quantity: z.number().min(0).optional(),
        stock: z.number().min(0).optional(),
    }),
});

export const ProductValidations = {
    createProductValidationSchema,
    updateProductValidationSchema,
};
