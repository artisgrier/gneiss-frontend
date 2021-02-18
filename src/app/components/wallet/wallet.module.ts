import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletRoutingModule } from './wallet-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { WalletComponent } from './wallet.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { AuthService } from 'src/app/service/auth.service';



@NgModule({
  declarations: [
    WalletComponent
  ],
  providers:[AuthService],
  imports: [
    CommonModule,
    WalletRoutingModule,
    NgxQRCodeModule,
    ReactiveFormsModule,
    FormsModule
  ],
  
})
export class WalletModule { }
