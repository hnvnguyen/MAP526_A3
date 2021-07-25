import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { ItemPrice, Order, OrderHistory, Pizza } from './data.model';
import { OrderHistoryPage } from './order-history/order-history.page';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }
  private toppings: ItemPrice[] = [
    {item: "Vegetables", price: 15.00},
    {item: "Meat Balls", price: 15.50},
    {item: "Pepperoni", price: 16.00},
    {item: "Mushrooms", price: 16.50}
  ];
  private sizes: ItemPrice[] = [
    {item: "Large", price: 4.0},
    {item: "Medium", price: 2.0},
    {item: "Small", price: 0.0},
    {item: "Party", price: 6.0}
  ];
  private currentOrder: Order = {
    pizza: [],
    totalPizza: 0,
    totalPrice: 0
  };
  private orderHistory: OrderHistory[] = [];

  getToppings() : Observable<ItemPrice[]> {
    return of(this.toppings);
  }
  getSizes() : Observable<ItemPrice[]>  {
    return of(this.sizes);
  }
  getToppingPrice(item) {
    return {...this.toppings.find(
      t => {return t.item == item;}
    )}
  }
  getSizePrice(item) {
    return {...this.sizes.find(
      s => {return s.item == item;}
    )}
  }
  getCurrentOrder() : Observable<Order> {
    return of(this.currentOrder);
  }
  addPizza(pizza: Pizza) {
    this.currentOrder.pizza.push(pizza);
    this.currentOrder.totalPizza += pizza.quantity;
    this.currentOrder.totalPrice += pizza.price;
  }
  removePizza(pizza: Pizza) {
    let re = this.currentOrder.pizza.indexOf(pizza, 0);
    if (re > -1) {
      this.currentOrder.pizza.splice(re, 1)
    }
    this.currentOrder.totalPrice -= pizza.price;
    this.currentOrder.totalPizza -= pizza.quantity;
  } 
  clearCurrentOrder() {  
    this.currentOrder = {
      pizza: [],
      totalPizza: 0,
      totalPrice: 0};
      console.log("Database");
    console.log(this.currentOrder);
  }
  placeOrder() {
    let h = {
      pizza: this.currentOrder.pizza,
      totalPrice: this.currentOrder.totalPrice,
      totalPizza: this.currentOrder.totalPizza,
      date: new Date()
    }
    this.orderHistory.push(h);
    this.clearCurrentOrder();
    console.log(this.orderHistory);
    console.log(this.currentOrder);
  }
  getOrderHistory() : Observable<OrderHistory[]> {
    return of(this.orderHistory);
  }
}
