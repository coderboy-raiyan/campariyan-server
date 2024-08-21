import { Types } from 'mongoose';

export type TCustomer = {
    name: string;
    email: string;
    user: Types.ObjectId | string;
    phoneNo: string;
    profileImg: string;
    homeAddress: string;
    officeAddress: string;
};
