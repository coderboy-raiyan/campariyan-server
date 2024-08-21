import { StatusCodes } from 'http-status-codes';
import { config } from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CustomerServices } from './customer.service';

const registerCustomer = catchAsync(async (req, res) => {
    const { accessToken, refreshToken, customer } = await CustomerServices.registerCustomerIntoDB(
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
        message: 'Signed in successfully',
        data: { user: customer, accessToken },
    });
});

export const CustomerControllers = {
    registerCustomer,
};
