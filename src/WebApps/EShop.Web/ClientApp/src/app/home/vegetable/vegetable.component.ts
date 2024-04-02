import { Component, OnInit } from '@angular/core';
import { ProductSlider } from '../../shared/data/slider';
import { ProductService } from '../../shared/services/product.service';
import { CatalogService } from '../../services/catalog.service'
import { GetProductsResponse, ProductModel } from 'src/app/models/catalog-model';
import { ConfigService } from 'src/app/core/services/config.service';

@Component({
  selector: 'app-vegetable',
  templateUrl: './vegetable.component.html',
  styleUrls: ['./vegetable.component.scss']
})
export class VegetableComponent implements OnInit {
  public ProductSliderConfig: any = ProductSlider;
  public products: ProductModel[] = [];
  getCartItems: boolean = false

  constructor(
    public productService: ProductService,
    private catalogService: CatalogService,
    private configService: ConfigService
    ) { }

  public sliders = [{
    title: '',
    subTitle: 'Vegetables, Fruits, Grocery', 
    image: 'assets/images/banner/banner_home2.png'
  }
];

  ngOnInit(): void {
    debugger;
    this.configService.getServiceConfig().toPromise();
    this.getCatalog();
  }

  getCatalog() {
    this.catalogService.GetCatalog().subscribe((response: GetProductsResponse) => {
      this.products = response.products;
      this.getCartItems = true;
    })
  }
}
