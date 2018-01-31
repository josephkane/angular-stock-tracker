import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http"


import { AppComponent } from './app.component';
import { StockTrackerComponent } from './stock-tracker/stock-tracker.component';

import { StockService } from "./stock.service";
import { AppRoutingModule } from './/app-routing.module';
import { StockHistoryComponent } from './stock-history/stock-history.component';


@NgModule({
  declarations: [
    AppComponent,
    StockTrackerComponent,
    StockHistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ StockService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
