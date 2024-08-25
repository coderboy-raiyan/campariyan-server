import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import { ReviewValidations } from './review.validation';

const ReviewRoutes = Router();

ReviewRoutes.post(
    '/create-review',
    auth('customer'),
    validateRequest(ReviewValidations.createReviewValidationSchema),
    ReviewController.createReview
);
ReviewRoutes.get('/', ReviewController.getAllReviews);
ReviewRoutes.patch(
    '/:id',
    auth('customer'),
    validateRequest(ReviewValidations.updateReviewValidationSchema),
    ReviewController.updateReview
);
ReviewRoutes.delete('/:id', auth('admin', 'customer'), ReviewController.deleteReview);

export default ReviewRoutes;
