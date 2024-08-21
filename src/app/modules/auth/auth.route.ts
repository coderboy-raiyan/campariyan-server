import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CustomerControllers } from '../customer/customer.controller';
import { CustomerValidations } from '../customer/customer.validation';

const AuthRoutes = Router();

AuthRoutes.post(
    '/register-customer',
    validateRequest(CustomerValidations.createCustomerValidation),
    CustomerControllers.registerCustomer
);

export default AuthRoutes;
