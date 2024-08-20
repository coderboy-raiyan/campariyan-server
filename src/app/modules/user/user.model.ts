import { model, Schema } from 'mongoose';
import { UserConstants } from './user.constant';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
    {
        password: {
            type: String,
            required: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            enum: Object.values(UserConstants.USER_ROLE),
            required: true,
        },
    },
    { timestamps: true }
);

const User = model('User', userSchema);

export default User;
