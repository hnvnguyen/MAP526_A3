import { Component, OnInit } from '@angular/core';
import { OrderHistory } from '../data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {
  orderHistory: OrderHistory[];
  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.getOrderHistory().subscribe(reData => this.orderHistory = reData);
  }

}
