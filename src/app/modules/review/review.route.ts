import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserConstants } from '../user/user.constant';
import { ReviewController } from './review.controller';
import { ReviewValidations } from './review.validation';

const ReviewRoutes = Router();

ReviewRoutes.post(
    '/create-review',
    auth(UserConstants.USER_ROLE.customer),
    validateRequest(ReviewValidations.createReviewValidationSchema),
    ReviewController.createReview
);
ReviewRoutes.get('/', ReviewController.getAllReviews);
ReviewRoutes.patch(
    '/:id',
    auth(UserConstants.USER_ROLE.customer),
    validateRequest(ReviewValidations.updateReviewValidationSchema),
    ReviewController.updateReview
);
ReviewRoutes.delete(
    '/:id',
    auth(
        UserConstants.USER_ROLE.customer,
        UserConstants.USER_ROLE.admin,
        UserConstants.USER_ROLE.superAdmin
    ),
    ReviewController.deleteReview
);

export default ReviewRoutes;
