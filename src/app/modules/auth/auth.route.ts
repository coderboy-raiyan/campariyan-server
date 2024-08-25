import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AdminControllers } from '../admin/admin.controller';
import { AdminValidations } from '../admin/admin.validation';
import { CustomerControllers } from '../customer/customer.controller';
import { CustomerValidations } from '../customer/customer.validation';
import { UserConstants } from '../user/user.constant';

const AuthRoutes = Router();

AuthRoutes.post(
    '/register-customer',
    validateRequest(CustomerValidations.createCustomerValidation),
    CustomerControllers.registerCustomer
);
AuthRoutes.post(
    '/login-customer',
    validateRequest(CustomerValidations.loginCustomerValidation),
    CustomerControllers.loginCustomer
);
AuthRoutes.post(
    '/register-admin',
    auth(UserConstants.USER_ROLE.admin, UserConstants.USER_ROLE.superAdmin),
    validateRequest(AdminValidations.createAdminValidationSchema),
    AdminControllers.registerAdmin
);
AuthRoutes.post(
    '/login-admin',
    validateRequest(AdminValidations.loginAdminValidationSchema),
    AdminControllers.loginAdmin
);

export default AuthRoutes;
