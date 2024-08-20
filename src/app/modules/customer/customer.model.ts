import { model, Schema } from 'mongoose';
import { TCustomer } from './customer.interface';

const customerSchema = new Schema<TCustomer>({
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
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    profileImg: {
        type: String,
        default: 'https://i.pinimg.com/736x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg',
    },
    homeAddress: {
        type: String,
        required: true,
    },
    officeAddress: {
        type: String,
        default: null,
    },
});

const Customer = model('Customer', customerSchema);

export default Customer;
