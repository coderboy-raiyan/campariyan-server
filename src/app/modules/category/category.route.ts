import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserConstants } from '../user/user.constant';
import { CategoryControllers } from './category.controller';
import { CategoryValidations } from './category.validation';

const CategoryRoutes = Router();

CategoryRoutes.get('/', CategoryControllers.getAllCategories);

CategoryRoutes.post(
    '/create-category',
    auth(
        UserConstants.USER_ROLE.admin,
        UserConstants.USER_ROLE.superAdmin,
        UserConstants.USER_ROLE.customer
    ),
    validateRequest(CategoryValidations.createCategoryValidationSchema),
    CategoryControllers.createCategory
);
CategoryRoutes.patch(
    '/:id',
    auth(
        UserConstants.USER_ROLE.admin,
        UserConstants.USER_ROLE.superAdmin,
        UserConstants.USER_ROLE.customer
    ),
    validateRequest(CategoryValidations.updateCategoryValidationSchema),
    CategoryControllers.updateCategory
);
CategoryRoutes.delete(
    '/:id',
    auth(
        UserConstants.USER_ROLE.admin,
        UserConstants.USER_ROLE.superAdmin,
        UserConstants.USER_ROLE.customer
    ),
    CategoryControllers.deleteCategory
);

export default CategoryRoutes;
