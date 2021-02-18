import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APIRoutingModule } from './api-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { AuthService } from 'src/app/service/auth.service';



@NgModule({
  declarations: [
  ],
  providers:[AuthService],
  imports: [
    CommonModule,
    APIRoutingModule,
    NgxQRCodeModule,
    ReactiveFormsModule,
    FormsModule
  ],
  
})
export class APIModule { }
