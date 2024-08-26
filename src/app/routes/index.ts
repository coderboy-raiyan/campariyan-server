import { Router } from 'express';
import AuthRoutes from '../modules/auth/auth.route';
import CategoryRoutes from '../modules/category/category.route';
import CustomerRoutes from '../modules/customer/customer.route';
import OrderRoutes from '../modules/order/order.route';
import ProductRoutes from '../modules/Product/product.route';
import ReviewRoutes from '../modules/review/review.route';

const router = Router();

const routes = [
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/customer',
        route: CustomerRoutes,
    },
    {
        path: '/categories',
        route: CategoryRoutes,
    },
    {
        path: '/products',
        route: ProductRoutes,
    },
    {
        path: '/reviews',
        route: ReviewRoutes,
    },
    {
        path: '/orders',
        route: OrderRoutes,
    },
];

routes.forEach(({ path, route }) => {
    router.use(path, route);
});

export default router;
