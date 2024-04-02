import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, forkJoin, Observable, of } from 'rxjs';
import { BasketService } from './basket.service';
import { CatalogService } from './catalog.service';
import { GetBasketResponse, ShoppingCartModel, StoreBasketRequest } from '../models/basket-model';
import { Router } from '@angular/router';
import { GetProductByIdResponse } from '../models/catalog-model';
import { ShoppingCartItemModel } from '../models/basket-item-model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public OpenCart = false;
  private cartSubject = new BehaviorSubject<ShoppingCartModel>({} as ShoppingCartModel);

  constructor(
    private catalogService: CatalogService,
    private basketService: BasketService,
    private router: Router) { }

    public AddToCart(productId: string, userName: string, counter: number): Observable<boolean> {
      forkJoin(
        this.catalogService.GetCatalogById(productId),
        this.basketService.GetBasket(userName)
      ).subscribe((result) => {

        const product = (result[0] as GetProductByIdResponse).product;
        const basket = (result[1] as GetBasketResponse);

        if (basket.cart.items.length > 0 && basket.cart.items.find(p => p.productId === productId)){
          basket.cart.items.forEach(p => {
            if (p.productId === productId){
              p.price = product.price;
              if (counter > 0){
                p.quantity++;
              }else {
                p.quantity--;
              }
            }          
          });
        }
        else {
          basket.cart.items.push(
            {
              productId: productId,
              productName: product.name,
              price: product.price,
              quantity: counter || 1,
              color: ''
            } as ShoppingCartItemModel
          )
        }

        const storeBasketRequest = {
           cart : basket.cart
        } as StoreBasketRequest; 

        this.basketService.UpdateBasket(storeBasketRequest).subscribe((response) => {
          if (response){
            this.OpenCart = true;  
            this.cartSubject.next(basket.cart);
            return EMPTY;
          }
        });
      });
      return EMPTY;
    }

    get cartChanged() {
      return this.cartSubject.asObservable();
    }

    public RemoveToCart(productId: string, userName: string): Observable<ShoppingCartModel>{
      this.basketService.GetBasket(userName)
      .subscribe((basket: GetBasketResponse) => {
        var index = basket.cart.items.findIndex(i => i.productId == productId);
        if (index > -1)
        {
          basket.cart.items.splice(index, 1);
          this.basketService.UpdateBasket(basket)
            .subscribe((result) => {
              this.cartSubject.next(basket.cart);
                return EMPTY;
            });
        }
      });
      return EMPTY;
    }
}
