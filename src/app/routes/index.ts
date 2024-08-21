import { Router } from 'express';
import AuthRoutes from '../modules/auth/auth.route';
import CategoryRoutes from '../modules/category/category.route';
import CustomerRoutes from '../modules/customer/customer.route';

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
];

routes.forEach(({ path, route }) => {
    router.use(path, route);
});

export default router;
