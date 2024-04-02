import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigStore } from '../core/services/config.store';
import { GetBasketResponse, StoreBasketRequest, StoreBasketResponse } from '../models/basket-model';
import { BasketCheckoutModel, CheckoutBasketRequest, CheckoutBasketResponse } from '../models/basket-checkout-model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(
    private configStore: ConfigStore,
    private httpClient: HttpClient ) { }

  public GetBasket(userName: string): Observable<GetBasketResponse>
  {
    return this.httpClient.get<GetBasketResponse>(`${this.configStore.apiUrl}/basket-service/basket/${userName}`);
  }

  public UpdateBasket(request: StoreBasketRequest): Observable<StoreBasketResponse>
  {
    return this.httpClient.post<StoreBasketResponse>(`${this.configStore.apiUrl}/basket-service/basket`, request);
  }

  public CheckoutBasket(request: CheckoutBasketRequest)
  {
    return this.httpClient.post<CheckoutBasketResponse>(`${this.configStore.apiUrl}/basket-service/basket/checkout`, request);
  }
}
