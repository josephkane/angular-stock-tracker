import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { StockService } from "../stock.service"

@Component({
	selector: 'app-stock-history',
	templateUrl: './stock-history.component.html',
	styleUrls: ['./stock-history.component.css']
})
export class StockHistoryComponent implements OnInit {

	history: {}[];
	symbol: string;

	constructor(
		private route: ActivatedRoute,
		private stockService: StockService,
		private location: Location
	) { }

	ngOnInit() {
		this.symbol = this.route.snapshot.paramMap.get("symbol")
		this.getStockHistory(this.symbol);
	}

	getStockHistory(symbol: string): void {
		this.stockService.getStockHistory(symbol)
			.subscribe(history => this.history = history);
		
	}

}
