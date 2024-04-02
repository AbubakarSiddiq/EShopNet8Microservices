import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetProductsResponse, ProductModel } from 'src/app/models/catalog-model';
import { CatalogService } from 'src/app/services/catalog.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public grid: string = 'col-xl-2 col-md-6';
  public layoutView: string = 'grid-view';
  params: string  
  searchString: string
  // public products: CatalogModel[] = [];
  // public productList: CatalogModel[] = [];
  public products: ProductModel[] = [];
  public productList: ProductModel[] = [];

  constructor(
    private route: ActivatedRoute,
    public _toaster: ToastrService,
    private catalogService: CatalogService
  ) { 
    this.route.queryParams.subscribe(params => {
      this.params = params['product'];
  });
  }

  ngOnInit(): void {
    this.catalogService.GetCatalog().subscribe((response: GetProductsResponse) => {
      this.productList = response.products;
      this.searchProductsByRouteParams()
    });
  }
  searchProductsByRouteParams() {
    if (this.params)
    {
      this.products = this.productList.filter(p => p.name.toLowerCase().includes(this.params.toLowerCase()));
    }
  }

  searchProducts() {
    if (this.searchString)
    {
      this.products = this.productList.filter(p => p.name.toLowerCase().includes(this.searchString.toLowerCase()));
    }
    else
    {
      this._toaster.info("Please Enter Product Name In Search Box", "Empty Product Search Box")
      this.products = []
    }
  }

  // Change Grid Layout
  updateGridLayout(value: string) {
    this.grid = value;
  }

  // Change Layout View
  updateLayoutView(value: string) {
    this.layoutView = value;
    if(value == 'list-view')
      this.grid = 'col-lg-12';
    else
      this.grid = 'col-xl-2 col-md-6';
  }
}
