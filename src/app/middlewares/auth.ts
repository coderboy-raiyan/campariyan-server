import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config';
import AppError from '../errors/AppError';
import Customer from '../modules/customer/customer.model';
import { UserConstants } from '../modules/user/user.constant';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';

function auth(...roles: TUserRole[]) {
    return catchAsync(async (req, res, next) => {
        const token = req?.headers?.authorization?.split('Bearer ')[1];

        if (!token) {
            throw new AppError(StatusCodes.UNAUTHORIZED, 'Access denied. No token provided.');
        }

        let decoded;
        try {
            decoded = jwt.verify(token, config.JWT_ACCESS_SECRET);
        } catch (error) {
            throw new Error(error);
        }
        if (!decoded) {
            throw new AppError(StatusCodes.FORBIDDEN, 'You are not authorized!');
        }

        const { _id, role } = decoded as JwtPayload;

        let user;

        if (role === UserConstants.USER_ROLE.admin) {
            user = await Customer.findById(_id).populate('user');
        }

        if (!user) {
            throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
        }

        if (!roles.includes(role)) {
            throw new AppError(
                StatusCodes.FORBIDDEN,
                'You are not authorized to access this content!'
            );
        }

        req.user = user.toObject();
        next();
    });
}

export default auth;
