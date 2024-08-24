import { Router } from 'express';
import upload from '../../middlewares/multer';
import validateRequest from '../../middlewares/validateRequest';
import catchAsync from '../../utils/catchAsync';
import { ProductControllers } from './product.controller';
import { ProductValidations } from './product.validation';

const ProductRoutes = Router();

ProductRoutes.get('/', ProductControllers.getAllProducts);
ProductRoutes.post(
    '/create-product',
    upload.array('files', 5),
    catchAsync(async (req, res, next) => {
        req.body = await ProductValidations.createProductValidationSchema.parseAsync(
            JSON.parse(req.body.data)
        );
        return ProductControllers.createProduct(req, res, next);
    })
);
ProductRoutes.patch(
    '/:id',
    validateRequest(ProductValidations.updateProductValidationSchema),
    ProductControllers.updateProduct
);
ProductRoutes.delete('/:id', ProductControllers.deleteProduct);

export default ProductRoutes;
