import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import { ReviewValidations } from './review.validation';

const ReviewRoutes = Router();

ReviewRoutes.post(
    '/create-review',
    validateRequest(ReviewValidations.createReviewValidationSchema),
    ReviewController.createReview
);
ReviewRoutes.get('/', ReviewController.getAllReviews);
ReviewRoutes.patch(
    '/:id',
    validateRequest(ReviewValidations.updateReviewValidationSchema),
    ReviewController.updateReview
);
ReviewRoutes.delete('/:id', ReviewController.deleteReview);

export default ReviewRoutes;
