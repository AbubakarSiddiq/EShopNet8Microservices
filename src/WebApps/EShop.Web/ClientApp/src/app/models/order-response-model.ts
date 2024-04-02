
export interface OrderModel{
    id: string;
    customerId: string;
    orderName: string;
    shippingAddress: AddressModel; 
    billingAddress: AddressModel;
    payment: PaymentModel;
    status: OrderStatus;
    orderItems: OrderItemModel[];
}

export interface OrderItemModel{
    orderId: string;
    productId: string; 
    quantity: number; 
    price: number;
};

export interface AddressModel{
    firstName: string;
    lastName: string;
    emailAddress: string;
    addressLine: string;
    country: string;
    state: string;
    zipCode: string;
}

export interface PaymentModel{
    cardName: string;
    cardNumber: string;
    expiration: string;
    cvv: string;
    paymentMethod: number;
}

export enum OrderStatus
{
    draft = 1,
    pending = 2,
    completed = 3,
    cancelled = 4
}


export interface GetOrdersResponse{
    orders: PaginatedResult<OrderModel>
};
export interface GetOrdersByNameResponse{
    orders: OrderModel[]
}
export interface GetOrdersByCustomerResponse{
    orders: OrderModel[]
}


export class PaginatedResult<TEntity> {
    readonly pageIndex: number;
    readonly pageSize: number;
    readonly count: number;
    readonly data: TEntity[];

    constructor(pageIndex: number, pageSize: number, count: number, data: TEntity[]) {
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.count = count;
        this.data = data;
    }
}