import { z } from 'zod';
import { UserValidations } from '../user/user.validation';

const createCustomerValidation = z.object({
    body: z.object({
        name: z.string().max(50),
        password: z
            .string()
            .min(1, { message: 'Must have at least 1 character' })
            .regex(UserValidations.passwordValidationRegex, {
                message: 'Your password is not valid',
            }),
        email: z.string().email({ message: 'Invalid email address' }),
        phoneNo: z.string(),
        homeAddress: z.string(),
        officeAddress: z.string().optional(),
    }),
});

export const CustomerValidations = {
    createCustomerValidation,
};
