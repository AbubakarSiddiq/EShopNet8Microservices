import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QuickViewComponent } from "../../modal/quick-view/quick-view.component";
import { CartModalComponent } from "../../modal/cart-modal/cart-modal.component";
import { Product } from "../../../classes/product";
import { ProductService } from "../../../services/product.service";
// import { CatalogModel } from 'src/app/models/catalog-model';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/app/models/catalog-model';

@Component({
  selector: 'app-product-box-two',
  templateUrl: './product-box-two.component.html',
  styleUrls: ['./product-box-two.component.scss']
})
export class ProductBoxTwoComponent implements OnInit {

  @Input() product: ProductModel;
  @Input() currency: any;
  @Input() cartModal: boolean = false; // Default False
  
  @ViewChild("quickView") QuickView: QuickViewComponent;
  @ViewChild("cartModal") CartModal: CartModalComponent;

  public ImageSrc : string

  constructor(private productService: ProductService,
    private cartService: CartService) {}

  ngOnInit(): void {
  }

  getImageSrc(product: ProductModel) {
    return this.ImageSrc = 'assets/images/product/' + product.imageFile;
  }

  addToCart(product: ProductModel) {
    this.cartService.AddToCart(product.id, 'swn', 1);
  }

}
