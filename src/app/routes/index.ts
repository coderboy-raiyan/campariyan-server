import { Router } from 'express';
import AuthRoutes from '../modules/auth/auth.route';
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
];

routes.forEach(({ path, route }) => {
    router.use(path, route);
});

export default router;
