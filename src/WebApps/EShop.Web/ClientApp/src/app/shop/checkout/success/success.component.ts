import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { GetOrdersByNameResponse } from 'src/app/models/order-response-model';
// import { OrderResponseModel } from 'src/app/models/order-response-model';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit{
  public orderDetails: GetOrdersByNameResponse;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {	
    this.orderService.GetOrdersByUserName('swn').subscribe((result: GetOrdersByNameResponse) => {
      this.orderDetails = result;
    });
  }
}
