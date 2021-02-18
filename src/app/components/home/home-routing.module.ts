import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from './index/index.component';
import { NewCoinComponent } from './new-coin/new-coin.component';
import { NewRegistrationComponent } from './new-registration/new-registration.component';
import { TradeComponent } from './trade/trade.component';
import { OpenOrdersComponent } from './open-orders/open-orders.component';

const routes: Routes = [
  { path: 'client-home', component:IndexComponent},
  { path: 'new-coin', component: NewCoinComponent },
  { path: 'new-registration', component: NewRegistrationComponent },
  { path: 'trade/:address/:hash/:name/:abbr/:price', component: TradeComponent},
  { path: 'open-orders', component: OpenOrdersComponent},

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
