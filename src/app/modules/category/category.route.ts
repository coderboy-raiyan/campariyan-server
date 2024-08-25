import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryControllers } from './category.controller';
import { CategoryValidations } from './category.validation';

const CategoryRoutes = Router();

CategoryRoutes.get('/', CategoryControllers.getAllCategories);

CategoryRoutes.post(
    '/create-category',
    auth('admin', 'customer'),
    validateRequest(CategoryValidations.createCategoryValidationSchema),
    CategoryControllers.createCategory
);
CategoryRoutes.patch(
    '/:id',
    auth('admin', 'customer'),
    validateRequest(CategoryValidations.updateCategoryValidationSchema),
    CategoryControllers.updateCategory
);
CategoryRoutes.delete('/:id', auth('admin', 'customer'), CategoryControllers.deleteCategory);

export default CategoryRoutes;
