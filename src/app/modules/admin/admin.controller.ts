import { StatusCodes } from 'http-status-codes';
import { config } from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const registerAdmin = catchAsync(async (req, res) => {
    const { accessToken, refreshToken, customer } = await AdminServices.registerAdminIntoDB(
        req.body
    );

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 10 * 24 * 60 * 60 * 1000,
        secure: config.NODE_ENV === 'production',
    });

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Signed up successfully',
        data: { user: customer, accessToken },
    });
});
const loginAdmin = catchAsync(async (req, res) => {
    const { accessToken, refreshToken, customer } = await AdminServices.loginAdminFromDB(req.body);

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 10 * 24 * 60 * 60 * 1000,
        secure: config.NODE_ENV === 'production',
    });

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Signed in successfully',
        data: { user: customer, accessToken },
    });
});

export const AdminControllers = {
    registerAdmin,
    loginAdmin,
};
