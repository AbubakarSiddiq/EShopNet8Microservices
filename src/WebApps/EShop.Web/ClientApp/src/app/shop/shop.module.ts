import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';

// Product Details Widgest Components
import { CountdownComponent } from './product/widgets/countdown/countdown.component';
import { SocialComponent } from './product/widgets/social/social.component';
import { StockInventoryComponent } from './product/widgets/stock-inventory/stock-inventory.component';

// Collection Components
import { CollectionLeftSidebarComponent } from './collection/collection-left-sidebar/collection-left-sidebar.component';
// Collection Widgets
import { GridComponent } from './collection/widgets/grid/grid.component';
import { PaginationComponent } from './collection/widgets/pagination/pagination.component';
import { BrandsComponent } from './collection/widgets/brands/brands.component';
import { ColorsComponent } from './collection/widgets/colors/colors.component';
import { SizeComponent } from './collection/widgets/size/size.component';
import { PriceComponent } from './collection/widgets/price/price.component';

import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SuccessComponent } from './checkout/success/success.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [
    CountdownComponent,
    SocialComponent,
    StockInventoryComponent,
    CollectionLeftSidebarComponent,
    GridComponent,
    PaginationComponent,
    BrandsComponent,
    ColorsComponent,
    SizeComponent,
    PriceComponent,
    CartComponent,
    CheckoutComponent,
    SuccessComponent
  ],
  imports: [
    CommonModule,
    NgxSliderModule,
    SharedModule,
    ShopRoutingModule,
    CalendarModule,
    DropdownModule
  ]
})
export class ShopModule { }
