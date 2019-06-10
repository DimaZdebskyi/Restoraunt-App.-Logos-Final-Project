import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit {
  orderList = {};

  constructor(private service: OrderService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.refreshList();
  }

  refreshList(){
    this.orderList = this.service.getOrderList();
  }

  openForEdit(orderID: number){
    this.router.navigate(['/order/edit' + orderID]);
  }

}
