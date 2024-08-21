import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductControllers } from './product.controller';
import { ProductValidations } from './product.validation';

const ProductRoutes = Router();

ProductRoutes.post(
    '/create-product',
    validateRequest(ProductValidations.createProductValidationSchema),
    ProductControllers.createProduct
);

export default ProductRoutes;
