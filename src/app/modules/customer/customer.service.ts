import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt';
import { UserConstants } from '../user/user.constant';
import User from '../user/user.model';
import { TCustomer } from './customer.interface';
import Customer from './customer.model';

const registerCustomerIntoDB = async (payload: TCustomer & { password: string }) => {
    const user = await Customer.findOne({ email: payload?.email }, { email: 1 });

    if (user) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Email already taken!');
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const createdUser = await User.create(
            [{ password: payload?.password, role: UserConstants.USER_ROLE.admin }],
            { session }
        );

        if (!createdUser) {
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create user!');
        }

        const createdCustomer = await Customer.create(
            [{ ...payload, userId: createdUser[0]?._id }],
            { session }
        );

        if (!createdCustomer) {
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create customer!');
        }

        const accessToken = generateAccessToken({
            _id: createdUser[0]?._id,
            email: createdCustomer[0]?.email,
            role: createdUser[0]?.role,
        });
        const refreshToken = generateRefreshToken({
            _id: createdUser[0]?._id,
            email: createdCustomer[0]?.email,
            role: createdUser[0]?.role,
        });

        await session.commitTransaction();
        await session.endSession();

        return {
            customer: createdCustomer[0],
            accessToken,
            refreshToken,
        };
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();

        throw new Error(error);
    }
};

export const CustomerServices = {
    registerCustomerIntoDB,
};
