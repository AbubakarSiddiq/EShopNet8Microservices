export interface BasketCheckoutModel {
    userName: string;
    customerId: string;
    totalPrice: number;
    firstName: string;
    lastName: string;
    emailAddress: string;
    addressLine: string;
    country: string;
    state: string;
    zipCode: string;
    cardName: string;
    cardNumber: string;
    expiration: string;
    cvv: string;
    paymentMethod: number;
}

export interface CheckoutBasketRequest{
    BasketCheckoutDto: BasketCheckoutModel
}

export interface CheckoutBasketResponse{
    IsSuccess: boolean
};