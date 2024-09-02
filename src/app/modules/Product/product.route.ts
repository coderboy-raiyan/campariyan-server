import { Router } from 'express';
import fs from 'fs';
import auth from '../../middlewares/auth';
import upload from '../../middlewares/multer';
import validateRequest from '../../middlewares/validateRequest';
import catchAsync from '../../utils/catchAsync';
import { UserConstants } from '../user/user.constant';
import { ProductControllers } from './product.controller';
import { ProductValidations } from './product.validation';

const ProductRoutes = Router();

ProductRoutes.get('/', ProductControllers.getAllProducts);
ProductRoutes.get('/:id', ProductControllers.getSingleProduct);
ProductRoutes.post(
    '/create-product',
    auth(
        UserConstants.USER_ROLE.admin,
        UserConstants.USER_ROLE.superAdmin,
        UserConstants.USER_ROLE.customer
    ),
    upload.array('files', 5),
    catchAsync(async (req, res, next) => {
        const { price, stock, ...rest } = JSON.parse(req.body.data);
        try {
            req.body = await ProductValidations.createProductValidationSchema.parseAsync({
                ...rest,
                price: Number(price),
                stock: Number(stock),
            });
        } catch (error) {
            for (const file of req.files as Express.Multer.File[]) {
                fs.unlink(file?.path, (err) => {
                    next(err);
                });
            }
            next(error);
        }
        next();
    }),

    ProductControllers.createProduct
);
ProductRoutes.patch(
    '/:id',
    auth(
        UserConstants.USER_ROLE.admin,
        UserConstants.USER_ROLE.superAdmin,
        UserConstants.USER_ROLE.customer
    ),
    validateRequest(ProductValidations.updateProductValidationSchema),
    ProductControllers.updateProduct
);
ProductRoutes.delete(
    '/:id',
    auth(
        UserConstants.USER_ROLE.admin,
        UserConstants.USER_ROLE.superAdmin,
        UserConstants.USER_ROLE.customer
    ),
    ProductControllers.deleteProduct
);

export default ProductRoutes;
