import { z } from 'zod';

const createReviewValidationSchema = z.object({
    body: z.object({
        description: z.string().trim(),
        rating: z.number().min(1).max(5),
        customer: z.string(),
        product: z.string(),
    }),
});
const updateReviewValidationSchema = z.object({
    body: z.object({
        description: z.string().trim().optional(),
        rating: z.number().min(1).max(5).optional(),
    }),
});

export const ReviewValidations = {
    createReviewValidationSchema,
    updateReviewValidationSchema,
};
