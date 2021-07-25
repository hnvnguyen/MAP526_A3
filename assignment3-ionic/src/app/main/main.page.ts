import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(private data: DataService) {}

  ngOnInit() {
  }

  newOrder() {
    this.data.clearCurrentOrder();
  }

}
