import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductControllers } from './product.controller';
import { ProductValidations } from './product.validation';

const ProductRoutes = Router();

ProductRoutes.get('/', ProductControllers.getAllProducts);
ProductRoutes.post(
    '/create-product',
    validateRequest(ProductValidations.createProductValidationSchema),
    ProductControllers.createProduct
);
ProductRoutes.patch(
    '/:id',
    validateRequest(ProductValidations.updateProductValidationSchema),
    ProductControllers.updateProduct
);

export default ProductRoutes;
