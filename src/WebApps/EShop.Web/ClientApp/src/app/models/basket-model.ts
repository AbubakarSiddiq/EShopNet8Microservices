import { ShoppingCartItemModel } from "./basket-item-model";

export interface ShoppingCartModel {
    userName: string;
    items: ShoppingCartItemModel[];
    totalPrice: number;
}

export interface GetBasketResponse{
    cart: ShoppingCartModel
}

export interface StoreBasketRequest{
    cart: ShoppingCartModel
}

export interface StoreBasketResponse{
    userName: string
};

export interface DeleteBasketResponse{
    isSuccess: boolean
};