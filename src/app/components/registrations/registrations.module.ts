import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationsRoutingModule } from './registrations-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BirthCertificateComponent } from './birth-certificate/birth-certificate.component';
import { SpaceshipComponent } from './spaceship/spaceship.component';
import { HouseComponent } from './house/house.component';
import { TestimonyComponent } from './testimony/testimony.component';
import { BusinessComponent } from './business/business.component';
import { ItemComponent } from './item/item.component';
import { DeathCertificateComponent } from './death-certificate/death-certificate.component';
import { CarComponent } from './car/car.component';
import { PlaneComponent } from './plane/plane.component';
import { BoatComponent } from './boat/boat.component';
import { MarriageComponent } from './marriage/marriage.component';

@NgModule({
  declarations: [
    BirthCertificateComponent,
    SpaceshipComponent,
    HouseComponent,
    TestimonyComponent,
    BusinessComponent,
    ItemComponent,
    DeathCertificateComponent,
    CarComponent,
    PlaneComponent,
    BoatComponent,
    MarriageComponent
  ],
  imports: [
    CommonModule,
    RegistrationsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxQRCodeModule
  ],

})
export class RegistrationsModule { }
