import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerListArr =[
    {CustomerID: 1, Name: "Olivia Kathleen"},
    {CustomerID: 2, Name: "Liam Patrick"},
    {CustomerID: 3, Name: "Charlotte Rose"},
    {CustomerID: 4, Name: "Elijah Burke"},
    {CustomerID: 5, Name: "Ayesha Ameer"},
    {CustomerID: 6, Name: "Eva Louis"}
  ]

  constructor() { }

  getCustomerList(){
    return this.customerListArr
      }
}
