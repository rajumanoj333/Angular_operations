import { HttpClientModule, provideHttpClient } from '@angular/common/http';

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {


  id:number=0;
  name:string='';
  orderdate:string='';
  ordertime:string='';
  message:string='';
  constructor(private http:HttpClient) { }


  ngOnInit(): void {
  }


  addProduct(){
    const product={
      id:this.id,
      name:this.name,
      orderdate:this.orderdate,
      ordertime:this.ordertime


    };

    

    this.http.post('http://localhost:3000/addProduct',product)
    .subscribe((response:any)=>{this.message=response.message},
    (error)=>{console.error('Error adding the product',error);});
  }


}