import { IonDatetime } from "@ionic/angular";

export class ItemPrice {
  item: string;
  price: number;
}

export class Pizza {
  quantity: number;
  topping: string;
  size: string;
  price: number;
}
export class Order {
  pizza: Pizza[];
  totalPrice: number;
  totalPizza: number;
}
export class OrderHistory extends Order {
  date: Date;
}