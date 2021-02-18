import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MarketplaceComponent } from './marketplace.component';
import { AuthService } from 'src/app/service/auth.service';



@NgModule({
  declarations: [
    MarketplaceComponent
  ],
  providers:[AuthService],
  imports: [
    CommonModule,
    MarketplaceRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  
})
export class MarketplaceModule { }
