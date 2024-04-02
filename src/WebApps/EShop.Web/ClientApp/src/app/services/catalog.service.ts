import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfigStore } from '../core/services/config.store';
import { GetProductByCategoryResponse, GetProductByIdResponse, GetProductsRequest, GetProductsResponse } from '../models/catalog-model';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(
    private configStore: ConfigStore,
    private httpClient: HttpClient) { }

  // public GetCatalog(): Observable<CatalogModel[]> 
  // {
  //   debugger;

  //   var request = {
  //     PageNumber: 1,
  //     PageSize: 20
  //   } as GetProductsRequest;

  //   const url = `https://localhost:6064/catalog-service/products`;
  //   const params = this.generateParams(request);

  //   var abc = this.httpClient.get<CatalogModel[]>(url, { params });

  //   // const url = `http://localhost:6064/catalog-service/products?pageNumber=1&pageSize=20`;
  //   // var abc = this.httpClient.get<any[]>(url);
  //   // // var abc = this.httpClient.get<CatalogModel[]>(`http://localhost:6064/catalog`);
  //   // console.log(this.configStore.apiUrl);
  //   // console.log('this. ');
  //   console.log(abc);
  //   return abc;
  // }

  public GetCatalog(): Observable<GetProductsResponse> 
  {
    var request = {
      PageNumber: 1,
      PageSize: 20
    } as GetProductsRequest;

    const url = `https://localhost:6064/catalog-service/products`;
    const params = this.generateParams(request);

    return this.httpClient.get<GetProductsResponse>(url, { params });
  }


  private generateParams(request: GetProductsRequest): any {
    let params: any = {};

    if (request.PageNumber) {
      params['pageNumber'] = request.PageNumber.toString();
    }

    if (request.PageSize) {
      params['pageSize'] = request.PageSize.toString();
    }

    return params;
  }

  public GetCatalogById(id: string): Observable<GetProductByIdResponse>
  {
    return this.httpClient.get<GetProductByIdResponse>(`${this.configStore.apiUrl}/catalog-service/products/${id}`);
  }

  public GetCatalogByCategory(category: string): Observable<GetProductByCategoryResponse>
  {
      return this.httpClient.get<GetProductByCategoryResponse>(`${this.configStore.apiUrl}/catalog-service/products/category/${category}`);
  }
}
