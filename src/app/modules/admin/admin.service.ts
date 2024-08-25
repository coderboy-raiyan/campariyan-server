import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt';
import { UserConstants } from '../user/user.constant';
import User from '../user/user.model';
import { TAdmin } from './admin.interface';
import Admin from './admin.model';

const registerAdminIntoDB = async (payload: TAdmin & { password: string }) => {
    const user = await Admin.findOne({ email: payload?.email }, { email: 1 });

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

        const createdAdmin = await Admin.create([{ ...payload, user: createdUser[0]?._id }], {
            session,
        });

        if (!createdAdmin) {
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create customer!');
        }

        const accessToken = generateAccessToken({
            _id: createdUser[0]?._id,
            email: createdAdmin[0]?.email,
            role: createdUser[0]?.role,
        });
        const refreshToken = generateRefreshToken({
            _id: createdUser[0]?._id,
            email: createdAdmin[0]?.email,
            role: createdUser[0]?.role,
        });

        await session.commitTransaction();
        await session.endSession();

        return {
            customer: createdAdmin[0],
            accessToken,
            refreshToken,
        };
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();

        throw new Error(error);
    }
};

const loginAdminFromDB = async (payload: { email: string; password: string }) => {
    const admin = await Admin.findOne({ email: payload?.email });

    if (!admin) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Email does not exists!');
    }

    const user = await User.findById(admin?.user).select('+password');

    if (!user) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'User does not exists!');
    }

    const verifyPassword = await bcrypt.compare(payload?.password, user?.password);

    if (!verifyPassword) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid user password!');
    }

    const accessToken = generateAccessToken({
        _id: admin?.user,
        email: admin?.email,
        role: user?.role,
    });
    const refreshToken = generateRefreshToken({
        _id: admin?.user,
        email: admin?.email,
        role: user?.role,
    });

    const userData = { ...admin.toObject(), ...user.toObject() };
    delete userData.password;

    return {
        customer: userData,
        accessToken,
        refreshToken,
    };
};

export const AdminServices = {
    registerAdminIntoDB,
    loginAdminFromDB,
};
