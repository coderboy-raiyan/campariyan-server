import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserConstants } from '../user/user.constant';
import { OrderControllers } from './order.controller';
import { OrderValidations } from './order.validation';

const OrderRoutes = Router();

OrderRoutes.post(
    '/checkout',
    auth(UserConstants.USER_ROLE.customer),
    validateRequest(OrderValidations.createOrderValidationSchema),
    OrderControllers.createOrder
);

export default OrderRoutes;
