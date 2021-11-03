import {Component, OnInit} from '@angular/core';
import {Product} from "./product-list/product.model";
import {PromoCode} from "./promo-code/promo-code.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  numItems: number = 0;
  subTotal: number = 0;
  discount: number = 0;
  discountPercent: number = 0;
  taxPercent: number = 10;
  tax: number = 0;
  totalPrice: number = 0;
  products: Product[] = [
    {
      name: 'product 1',
      description: 'des 1',
      price: 5.99,
      quantity: 1,
      id: 1
    },
    {
      name: 'product 2',
      description: 'des 2',
      price: 2,
      quantity: 1,
      id: 2
    }
  ]
  promoCodes: PromoCode[] = [
    {
      code: 'AUTUMN',
      discountPercent: 10
    },
    {
      code: 'WINTER',
      discountPercent: 20
    }
  ];

  ngOnInit() {
    this.updateCartSummary();
  }

  updateCartSummary(){
    let numItems: number = 0;
    let subTotal: number = 0;

    for (let product of this.products){
      numItems += product.quantity;
      subTotal += product.quantity * product.price;
    }
    this.numItems = numItems;
    this.subTotal = subTotal;
    this.discount = this.subTotal * this.discountPercent/100;
    this.tax = this.subTotal * this.taxPercent/100;
    this.totalPrice = this.subTotal - this.discount + this.tax;
  }

  removeProduct(productId: number){
    // Xóa sản phẩm
    this.products = this.products.filter(product => product.id !== productId);

    //Tính lại tổng số lượng và tổng tiền
    this.updateCartSummary();
  }

  updateProductQuantity(data: {id: number; quantity: number }){
    const product = this.products.find(product => product.id === data.id)
    if (product){
      product.quantity = data.quantity || 0;
    }
    this.updateCartSummary();
  }

  handleSubmit(userInput: string){
    for (let promoCode of this.promoCodes){
      if (userInput === promoCode.code){
        this.discountPercent = promoCode.discountPercent;
      }
    }
    this.updateCartSummary();
  }
}
