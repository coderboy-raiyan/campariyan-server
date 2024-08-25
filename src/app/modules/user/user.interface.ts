import { Types } from 'mongoose';

export type TUserRole = 'admin' | 'customer';

export type TUser = {
    id: string | Types.ObjectId;
    password: string;
    isVerified: boolean;
    role: TUserRole;
};
