import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinSettingsRoutingModule } from './coinSettings-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoinSettingsComponent } from './coinSettings.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { AuthService } from 'src/app/service/auth.service';



@NgModule({
  declarations: [
    CoinSettingsComponent
  ],
  providers:[AuthService],
  imports: [
    CommonModule,
    CoinSettingsRoutingModule,
    NgxQRCodeModule,
    ReactiveFormsModule,
    FormsModule
  ],
  
})
export class CoinSettingsModule { }
