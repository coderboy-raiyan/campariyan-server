const OrderStatus: {
    pending: 'pending';
    verified: 'verified';
    approved: 'approved';
    shipped: 'shipped';
    completed: 'completed';
    failed: 'failed';
    canceled: 'canceled';
} = {
    pending: 'pending',
    verified: 'verified',
    approved: 'approved',
    shipped: 'shipped',
    completed: 'completed',
    failed: 'failed',
    canceled: 'canceled',
};

const PaymentMethods = {
    COD: 'COD',
    stripe: 'stripe',
    sslcommerz: 'sslcommerz',
};

export const OrderConstants = {
    OrderStatus,
    PaymentMethods,
};
