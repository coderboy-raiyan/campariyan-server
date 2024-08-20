import { Router } from 'express';
import CustomerRoutes from '../modules/customer/customer.route';

const router = Router();

const routes = [
    {
        path: '/customer',
        route: CustomerRoutes,
    },
];

routes.forEach(({ path, route }) => {
    router.use(path, route);
});

export default router;
