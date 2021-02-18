import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HelpComponent} from './components/help/help.component';
import { APIComponent } from './components/api/api.component';


const routes: Routes = [

  { path: '', loadChildren: () => import('./components/front-page/front-page.module').then(mod => mod.FrontPageModule)},

  { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(mod => mod.AuthModule)},

  { path: 'profile', loadChildren: () => import('./components/profile/profile.module').then(mod => mod.ProfileModule)},
  { path: 'wallet', loadChildren: () => import('./components/wallet/wallet.module').then(mod => mod.WalletModule)},
  { path: 'marketplace', loadChildren: () => import('./components/marketplace/marketplace.module').then(mod => mod.MarketplaceModule)},
  { path: 'history', loadChildren: () => import('./components/history/history.module').then(mod => mod.HistoryModule)},
  
  { path: 'coinSettings/:address/:hash/:name/:abbr/:price', loadChildren: () => import('./components/coinSettings/coinSettings.module').then(mod => mod.CoinSettingsModule)},

  { path: 'home', loadChildren: () => import('./components/home/home.module').then(mod => mod.HomeModule)},

  { path: 'pages', loadChildren: () => import('./components/pages/pages.module').then(mod => mod.PagesModule)},

  { path: 'registrations', loadChildren: () => import('./components/registrations/registrations.module').then(mod => mod.RegistrationsModule)},
  
  { path: 'help', component: HelpComponent },
  
  { path: 'api', component: APIComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
