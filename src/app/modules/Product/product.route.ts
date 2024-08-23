import { Router } from 'express';
import upload from '../../middlewares/multer';
import validateRequest from '../../middlewares/validateRequest';
import { ProductControllers } from './product.controller';
import { ProductValidations } from './product.validation';

const ProductRoutes = Router();

ProductRoutes.get('/', ProductControllers.getAllProducts);
ProductRoutes.post(
    '/create-product',
    upload.array('images'),
    validateRequest(ProductValidations.createProductValidationSchema),
    ProductControllers.createProduct
);
ProductRoutes.patch(
    '/:id',
    validateRequest(ProductValidations.updateProductValidationSchema),
    ProductControllers.updateProduct
);
ProductRoutes.delete('/:id', ProductControllers.deleteProduct);

export default ProductRoutes;
