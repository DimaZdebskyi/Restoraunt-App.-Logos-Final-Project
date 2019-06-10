import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { OrderItem } from './order-item.model';
import { CustomerService } from 'src/app/shared/customer.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderArr= [];
  bodySave: {};
  formData:Order;
  orderItems:OrderItem[]

  constructor(private customerService: CustomerService) { }

  saveOrUpdateOrder(){

    let body ={
      ...this.formData,
      OrderItems : this.orderItems 
    };
      this.orderArr.push({OrderID: body["OrderID"],OrderNo: body["OrderNo"],Customer: this.customerService.getCustomerList()[body["CustomerID"]].Name,PMethod: body["PMethod"],GTotal: body["GTotal"]})
    return this.orderArr
    
  }

    getOrderList(){
      return this.orderArr
    }

    getOrderByID(id: number){
      return this.orderArr[id]
    }

}
