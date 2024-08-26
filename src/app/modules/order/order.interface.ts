import { Types } from 'mongoose';
import { TCustomer } from '../customer/customer.interface';
import { OrderConstants } from './order.constant';

export type TOrderedProducts = {
    name: string;
    quantity: number;
    price: number;
    description: string;
    stock: number;
    brand: string;
    productOriginalRef: string | Types.ObjectId;
    images: string[];
    color: string;
};

export type TOrderStatus = keyof typeof OrderConstants.OrderStatus;
export type TPaymentMethods = keyof typeof OrderConstants.PaymentMethods;

export type TOrder = {
    products: TOrderedProducts[];
    customer: TCustomer;
    orderStatus: TOrderStatus;
    paymentMethod: TPaymentMethods;
    paymentResponse: Record<string, unknown>;
};
