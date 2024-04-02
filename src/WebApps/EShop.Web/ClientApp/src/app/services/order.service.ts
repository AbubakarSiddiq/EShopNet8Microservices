import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigStore } from '../core/services/config.store';
import { GetOrdersByNameResponse } from '../models/order-response-model';
// import { OrderResponseModel } from '../models/order-response-model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private httpClient: HttpClient,
    private configStore: ConfigStore) { }
  
    public GetOrdersByUserName(orderName: string): Observable<GetOrdersByNameResponse>
    {
      return this.httpClient.get<GetOrdersByNameResponse>(`${this.configStore.apiUrl}/ordering-service/orders/${orderName}`)
    }
}
