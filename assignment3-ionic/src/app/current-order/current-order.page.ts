import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Order } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.page.html',
  styleUrls: ['./current-order.page.scss'],
})
export class CurrentOrderPage implements OnInit {
  order: Order;

  constructor(private data: DataService, private alertController: AlertController) { }

  ngOnInit() {
    this.data.getCurrentOrder().subscribe(reData => this.order = reData);
  }

  deletePizza(p) {
    console.log(p);
    this.data.removePizza(p);
  }
  async placeOrder() {
    if (this.order.totalPizza == 0) {
      const alert = await this.alertController.create({
        header: "Request denied",
        message: "Order must not be empty",
        buttons: ["OK"]
      });
      await alert.present();
    } else {
      this.data.placeOrder();
      this.data.getCurrentOrder().subscribe(reData => this.order = reData);
    }
  }
}
