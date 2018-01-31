import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StockTrackerComponent } from "./stock-tracker/stock-tracker.component"
import { StockHistoryComponent } from "./stock-history/stock-history.component"

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: StockTrackerComponent },
  { path: 'history/:symbol', component: StockHistoryComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
