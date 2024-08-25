import { Types } from 'mongoose';

export type TAdmin = {
    name: string;
    email: string;
    user: Types.ObjectId | string;
    phoneNo: string;
    profileImg: string;
    homeAddress: string;
};
