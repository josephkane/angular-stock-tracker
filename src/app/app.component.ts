import { Component, OnInit } from '@angular/core';

import { StockService } from "./stock.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private stockService: StockService) { }

  ngOnInit() {
  	console.log("app initialized")
  	this.stockService.addDefaultStocks(["WMT"])
  }
}
