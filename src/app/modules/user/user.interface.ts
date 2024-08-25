import { Types } from 'mongoose';
import { UserConstants } from './user.constant';

export type TUserRole = keyof typeof UserConstants.USER_ROLE;

export type TUser = {
    id: string | Types.ObjectId;
    password: string;
    isVerified: boolean;
    role: TUserRole;
};
