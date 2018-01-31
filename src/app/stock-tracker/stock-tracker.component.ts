import { Component, OnInit } from '@angular/core';

import { StockService } from "../stock.service"

@Component({
  selector: 'app-stock-tracker',
  templateUrl: './stock-tracker.component.html',
  styleUrls: ['./stock-tracker.component.css']
})
export class StockTrackerComponent implements OnInit {

  allTrackedStocks: [];
  showAddNewStock: boolean;
  newStockInput: string;

  constructor(private stockService: StockService) { }

  ngOnInit() {
    let symbols = this.stockService.prepareSymbolsForBatchFetch(this.stockService.getTrackedStocks())
    this.stockService.updateStocks(symbols)
      .subscribe(ts => this.allTrackedStocks = ts);
  }

  parseUsersNewStocks(stocks: string): string[] {
    return stocks.replace(/\s/g, "").toUpperCase().split(",");
  }

  addAndUpdateStocks(stocks: string): void {
    
    this.newStockInput = null;
    this.showAddNewStock = false;
    if ( stocks !== undefined ) {
      const parsedUserInput = this.parseUsersNewStocks(stocks);
      this.stockService.addAndUpdateStocks(parsedUserInput)
        .subscribe(ts => this.allTrackedStocks = ts);
    }
  }

  deleteStock(stock): void {
    const i = this.allTrackedStocks.indexOf(stock);
    this.allTrackedStocks.splice(i, 1)
    this.stockService.deleteStock(stock["symbol"]);
  }

  toggleAddNewStock(): void {
    this.showAddNewStock = !this.showAddNewStock;
  }
}
