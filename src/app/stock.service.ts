import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { TrackedStock } from "./tracked-stock"
import { mockTrackedStocks } from "./mock-tracked-stocks"

@Injectable()
export class StockService {

	trackedSymbols = new Set();
	private apiKey = "F9DU6N7G4M0BLWLU";

	constructor(private http: HttpClient) { }

	batchQuotesUrl(stocks: string, key: string): string {
		return `https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${stocks}&apikey=${key}`
	}

	stockHistoryUrl(symbol: string, key: string): string {
		return `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${key}`	
	}

	fetchBatchQuotes(stocks: string): Observable<{}[]> {
		return this.http.get(this.batchQuotesUrl(stocks, this.apiKey))
			.pipe( map(resp => resp["Stock Quotes"]) )
	}

	fetchStockHistory(symbol: string): Observable<any> {
		return this.http.get(this.stockHistoryUrl(symbol, this.apiKey))
				.pipe( 
					map(resp => resp["Time Series (Daily)"]) 
				)
	}

	prepareSymbolsForBatchFetch(symbols: Set<string>): string {
		return Array.from(this.trackedSymbols).join(",");
	}

	getTrackedStocks(): Set<string> {
		return this.trackedSymbols;
	}

	updateStocks(symbols): Observable<any> {
		// proper way to do this?
		let updatedStocks = [];
		const quotes = this.fetchBatchQuotes(symbols);
		quotes.subscribe(resp => 
					resp.map(data => {
					updatedStocks.push({
						symbol: data["1. symbol"],
						price: data["2. price"],
						updated: data["4. timestamp"],
					})
				})
			)
		return of(updatedStocks);
	}

	addAndUpdateStocks(stocks: string[]): Observable<any> {
		stocks.forEach(s => this.trackedSymbols.add(s));
		const symbolsForFetching = this.prepareSymbolsForBatchFetch(this.trackedSymbols);
		return this.updateStocks(symbolsForFetching);
	}

	deleteStock(symbol): void {
		this.trackedSymbols.delete(symbol);
	}

	getStockHistory(symbol: string): Observable<{}[]> {
		// proper way to do this?
		let dayData = [];
		const history = this.fetchStockHistory(symbol);
		history.subscribe(history => {
				Object.keys(history).map(key => {
					let day = history[key];
					while (dayData.length < 30) {
						dayData.push({
							date: key,
							open: day["1. open"],
							high: day["2. high"],
							low: day["3. low"],
							close: day["4. close"],
						})
					}
				})
			})
		return of(dayData);

	}

	addDefaultStocks(symbols: string[]): void {
		symbols.forEach(s => this.trackedSymbols.add(s));
	}
}
