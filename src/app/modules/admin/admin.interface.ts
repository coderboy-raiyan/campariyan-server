import { Types } from 'mongoose';

export type TAdmin = {
    name: string;
    email: string;
    userId: Types.ObjectId | string;
    phoneNo: string;
    profileImg: string;
    homeAddress: string;
};
