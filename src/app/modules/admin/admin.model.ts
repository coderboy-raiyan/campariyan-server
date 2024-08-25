import { model, Schema } from 'mongoose';
import { TAdmin } from './admin.interface';

const adminSchema = new Schema<TAdmin>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNo: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        profileImg: {
            type: String,
            default:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQymt_RnWOs-ybuJBdqopMAAxkaRMDfxFXzzg&s',
        },
        homeAddress: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Admin = model('Admin', adminSchema);

export default Admin;
