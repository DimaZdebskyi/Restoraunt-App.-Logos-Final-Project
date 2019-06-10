import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { CustomerService } from 'src/app/shared/customer.service';
import { Customer } from 'src/app/shared/customer.model';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {
  customerList : Customer[];
  isValid: boolean = true;

  constructor(private service: OrderService,
    private dialog:MatDialog,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private router: Router,
    private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    let orderID = this.currentRoute.snapshot.paramMap.get('id');
    if(orderID == null)
    this.resetForm();
    else{
    this.service.formData = this.service.getOrderByID(parseInt(orderID));
    }
    this.customerList = (this.customerService.getCustomerList()) as Customer[];
  }

  resetForm(form?: NgForm){
    if(form = null)
      form.resetForm();
    this.service.formData = {
      OrderID: null,
      OrderNo: Math.floor(100000+Math.random()*900000).toString(),
      CustomerID: 0,
      PMethod: '',
      GTotal: 0
    };
    this.service.orderItems= []
  }

  AddOrEditOrderItem(orderItemIndex, OrderID){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data = { orderItemIndex, OrderID };
    this.dialog.open( OrderItemsComponent, dialogConfig ).afterClosed().subscribe(res=>{this.updateGrandTotal();});

  }

  onDeletetOrderItem(orderItemID: number, i: number){
    this.service.orderItems.splice(i,1);
    this.updateGrandTotal();
  }


  updateGrandTotal(){
    this.service.formData.GTotal = this.service.orderItems.reduce((prev,curr) => {
      return prev + curr.Total;
    }, 0 );
    this.service.formData.GTotal = parseFloat((this.service.formData.GTotal).toFixed(2));
  }

  validateForm(){
    this.isValid = true;
    if(this.service.formData.CustomerID==0)
    this.isValid = false;
    else if(this.service.orderItems.length==0)
    this.isValid = false;
    return this.isValid
  }

  onSubmit(form: NgForm){
    if(this.validateForm()) {
     this.service.saveOrUpdateOrder() 
     this.resetForm();
     this.toastr.success('Submitted successfully', 'Restaurant App.');
     this.router.navigate(['/orders']);
  }
}

}

