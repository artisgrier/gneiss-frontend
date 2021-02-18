import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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

const routes: Routes = [
  { path: 'birth-certificate/:hash', component: BirthCertificateComponent },
  { path: 'spaceship/:hash', component: SpaceshipComponent },
  { path: 'house/:hash', component: HouseComponent },
  { path: 'testimony/:hash', component: TestimonyComponent },
  { path: 'business/:hash', component: BusinessComponent },
  { path: 'item/:hash', component: ItemComponent },
  { path: 'death-certificate/:hash', component: DeathCertificateComponent },
  { path: 'car/:hash', component: CarComponent },
  { path: 'plane/:hash', component: PlaneComponent },
  { path: 'boat/:hash', component: BoatComponent },
  { path: 'marriage/:hash', component: MarriageComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationsRoutingModule { }
