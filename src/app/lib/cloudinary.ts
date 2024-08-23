import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import { config } from '../config';
import AppError from '../errors/AppError';

cloudinary.config({
    cloud_name: config.CLOUDINARY_CLOUD_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_proxy: config.CLOUDINARY_API_SECRET,
});

async function uploadFileOnCloudinary(localFilePath: string) {
    try {
        if (!localFilePath) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'File path not found!');
        }
        const result = await cloudinary.uploader.upload('', {
            resource_type: 'auto',
            folder: 'campariyan',
        });
        fs.unlink(localFilePath, (err) => {
            if (err) {
                throw err;
            }
        });

        return result;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        throw new Error(error);
    }
}

export default uploadFileOnCloudinary;
