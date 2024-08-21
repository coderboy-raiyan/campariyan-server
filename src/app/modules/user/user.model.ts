import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import { config } from '../../config';
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

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, parseInt(config.BCRYPT_SALT_ROUNDS));
    }
    next();
});

const User = model<TUser>('User', userSchema);
export default User;
