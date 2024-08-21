import bcrypt from 'bcrypt';
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

        const createdCustomer = await Customer.create([{ ...payload, user: createdUser[0]?._id }], {
            session,
        });

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

const loginCustomerFromDB = async (payload: { email: string; password: string }) => {
    const customer = await Customer.findOne({ email: payload?.email });

    if (!customer) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Email does not exists!');
    }

    const user = await User.findById(customer?.user).select('+password');

    if (!user) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'User does not exists!');
    }

    const verifyPassword = await bcrypt.compare(payload?.password, user?.password);

    if (!verifyPassword) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid user password!');
    }

    const accessToken = generateAccessToken({
        _id: customer?._id,
        email: customer?.email,
        role: user?.role,
    });
    const refreshToken = generateRefreshToken({
        _id: customer?._id,
        email: customer?.email,
        role: user?.role,
    });

    const userData = { ...customer.toObject(), ...user.toObject() };
    delete userData.password;

    return {
        customer: userData,
        accessToken,
        refreshToken,
    };
};

export const CustomerServices = {
    registerCustomerIntoDB,
    loginCustomerFromDB,
};
