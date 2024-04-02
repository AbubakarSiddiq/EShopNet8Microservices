import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { VegetableComponent } from './vegetable/vegetable.component';
 

// Widgest Components
import { SliderComponent } from './widgets/slider/slider.component'
import { CollectionComponent } from './widgets/collection/collection.component'
import { ServicesComponent } from './widgets/services/services.component' 
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [ 
    VegetableComponent,
    SliderComponent,
    ServicesComponent,
    CollectionComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NgxSpinnerModule
  ]
})
export class HomeModule { }
