import { z } from 'zod';

const createProductValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        price: z.number().min(0),
        categories: z.string().or(z.array(z.string())),
        quantity: z.number().min(0),
        stock: z.number().min(0),
    }),
});

export const ProductValidations = {
    createProductValidationSchema,
};
