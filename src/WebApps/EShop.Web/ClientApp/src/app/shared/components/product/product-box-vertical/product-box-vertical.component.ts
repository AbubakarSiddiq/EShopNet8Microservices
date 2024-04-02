import { Component, Input } from '@angular/core';
import { ProductModel } from 'src/app/models/catalog-model';
// import { CatalogModel } from 'src/app/models/catalog-model';

@Component({
  selector: 'app-product-box-vertical',
  templateUrl: './product-box-vertical.component.html',
  styleUrls: ['./product-box-vertical.component.scss']
})
export class ProductBoxVerticalComponent {

  @Input() product : ProductModel;
  @Input() currency : any;

  public ImageSrc : string
  
  constructor() { 
  }

  getImageSrc(product: ProductModel) {
    return this.ImageSrc = 'assets/images/product/' + product.imageFile;
  }
}
