import { Component, OnInit, Output, Input, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {
  
  // Using Output EventEmitter
  @Output() priceFilter : EventEmitter<any> = new EventEmitter<any>();
	
  // define min, max and range
  @Input() min!: number;
  @Input() max!: number;

  public collapse: boolean = true;
  public isBrowser: boolean = false;

  options: Options = {
    floor: 0,
    ceil: 1000
  };
  
  price = { 
    minPrice: this.min, 
    maxPrice: this.max 
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { 
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true; // for ssr
    }
  }
  
  ngOnInit(): void {  }

  // Range Changed
  appliedFilter(event: any) {
    this.price = { minPrice: event.value, maxPrice: event.highValue };
    this.priceFilter.emit(this.price);
  }

}
