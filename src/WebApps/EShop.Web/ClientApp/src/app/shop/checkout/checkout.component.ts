import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment'
import { ViewportScroller } from '@angular/common';
// import { CatalogModel } from 'src/app/models/catalog-model';
import { BasketService } from 'src/app/services/basket.service';
// import { BasketModel } from 'src/app/models/basket-model';
import { BasketCheckoutModel, CheckoutBasketRequest } from 'src/app/models/basket-checkout-model';
import { ProductModel } from 'src/app/models/catalog-model';
import { GetBasketResponse, ShoppingCartModel } from 'src/app/models/basket-model';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public checkoutForm:  FormGroup;
  public products: ProductModel[] = [];
  userEmail: string 

  public cartItem: ShoppingCartModel;
  public Order: BasketCheckoutModel = {} as BasketCheckoutModel;
  constructor(private fb: FormBuilder,
    private router: Router,
    private viewScroller: ViewportScroller,
    private basketService: BasketService
    ) { 
    this.checkoutForm = this.fb.group({
      firstName: ['', [Validators.required , Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')] ],
      lastName: ['', [Validators.required , Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      cardName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiration: ['', Validators.required],
      cvv: ['', Validators.required],
      paymentMethod: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.basketService.GetBasket('swn').subscribe((result: GetBasketResponse) => {
      this.cartItem = result.cart;
    });
    this.viewScroller.scrollToPosition([0, 0]); 
  }

  public get getTotal(): number {
    return this.cartItem.totalPrice;
  }

  submit() {
    if (this.checkoutForm.valid) {
      const userName = 'swn';
      this.basketService.GetBasket(userName).subscribe((response: GetBasketResponse) => {
        this.cartItem = response.cart;
        this.Order.userName = userName;
        this.Order.totalPrice = this.cartItem.totalPrice;
        const checkoutBasketRequest = {
          BasketCheckoutDto: this.Order
        } as CheckoutBasketRequest;
        this.basketService.CheckoutBasket(checkoutBasketRequest).subscribe((result) => {
          this.router.navigate(['/checkout/success']);
        });
      });      
    }
  }
}
