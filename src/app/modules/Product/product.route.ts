import { Router } from 'express';
import auth from '../../middlewares/auth';
import upload from '../../middlewares/multer';
import validateRequest from '../../middlewares/validateRequest';
import catchAsync from '../../utils/catchAsync';
import { ProductControllers } from './product.controller';
import { ProductValidations } from './product.validation';

const ProductRoutes = Router();

ProductRoutes.get('/', ProductControllers.getAllProducts);
ProductRoutes.post(
    '/create-product',
    auth('admin', 'customer'),
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
    auth('admin', 'customer'),
    validateRequest(ProductValidations.updateProductValidationSchema),
    ProductControllers.updateProduct
);
ProductRoutes.delete('/:id', auth('admin', 'customer'), ProductControllers.deleteProduct);

export default ProductRoutes;
