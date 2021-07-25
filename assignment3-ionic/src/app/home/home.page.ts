import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ItemPrice, Pizza } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  toppings: ItemPrice[];
  sizes: ItemPrice[];
  private topping: string = "0";
  private size: string = "0";
  private quantity: string = "0";

  constructor(private data: DataService, private router: Router, private alertController: AlertController) {}

  ngOnInit() : void{
    this.data.getToppings().subscribe(reData => this.toppings = reData);
    this.data.getSizes().subscribe(reData => this.sizes = reData);
  }

  myOrder() {
    this.topping = "0";
    this.size = "0";
    this.quantity = "0";
  }
  changeNum(event) {
    this.quantity += event.target.innerText;
    var num = parseInt(this.quantity);
    this.quantity = num.toString();
  }
  resetNum() {
    this.quantity = "0";
  }
  chooseSize(event) {
    this.size = event.target.innerText;
  }
  chooseTopping(event) {
    this.topping = event.target.innerText;
  }
  async add() {
    if (this.quantity == "0" || this.size == "0" || this.topping == "0") {
    const alert = await this.alertController.create({
      header: "Request denied",
      message: "Quantity, size and topping must be choosen in order to proceed.",
      buttons: ["OK"]
    });
    await alert.present();
    }
    else {
      let tPrice = this.data.getToppingPrice(this.topping);
      let sPrice = this.data.getSizePrice(this.size);
      let total = (tPrice.price + sPrice.price) * parseInt(this.quantity)
      this.data.addPizza({price: total, quantity: parseInt(this.quantity), size: this.size, topping: this.topping});
      let cOrder;
      this.data.getCurrentOrder().subscribe(reData => cOrder = reData);
      let mes = "Your order has now " + cOrder.totalPizza + " pizza" + (cOrder.totalPizza == 1? ", " : "s, ") + 
      "and the total is " + cOrder.totalPrice.toFixed(2) + " CND";
      const alert = await this.alertController.create({
        header: "Success",
        message: mes,
        buttons: ["OK"]
      });
      await alert.present();
    }
  }
}
