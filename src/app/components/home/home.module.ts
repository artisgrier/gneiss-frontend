import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxQRCodeModule } from "ngx-qrcode2";
import { AuthService } from "src/app/service/auth.service";
import { PaginationComponent } from "../pagination/pagination.component";
import { HomeRoutingModule } from "./home-routing.module";
import { IndexComponent } from "./index/index.component";
import { NewCoinComponent } from "./new-coin/new-coin.component";
import { NewRegistrationComponent } from "./new-registration/new-registration.component";
import { BuyOrdersComponent } from "./trade/buy-orders/buy-orders.component";
import { HistoryComponent } from "./trade/history/history.component";
import { SellOrdersComponent } from "./trade/sell-orders/sell-orders.component";
import { TradeComponent } from "./trade/trade.component";
import { CryptoassetsComponent } from './index/cryptoassets/cryptoassets.component';
import { RegistrationComponent } from './index/registration/registration.component';
import { RealStateComponent } from './new-registration/real-state/real-state.component';
import { AutomobileComponent } from './new-registration/automobile/automobile.component';
import { WaterborneVesselComponent } from './new-registration/waterborne-vessel/waterborne-vessel.component';
import { AeronauticalVehicleComponent } from './new-registration/aeronautical-vehicle/aeronautical-vehicle.component';
import { SpacecraftComponent } from './new-registration/spacecraft/spacecraft.component';
import { HouseComponent } from './new-registration/house/house.component';
import { BusinessComponent } from './new-registration/business/business.component';
import { MarriageRegistrationComponent } from './new-registration/marriage-registration/marriage-registration.component';
import { BirthCertificateComponent } from './new-registration/birth-certificate/birth-certificate.component';
import { DeathCertificateComponent } from './new-registration/death-certificate/death-certificate.component';
import { WillTestimonialComponent } from './new-registration/will-testimonial/will-testimonial.component';
import { OpenOrdersComponent } from './open-orders/open-orders.component';

import { ItemComponent } from './new-registration/item/item.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    IndexComponent,
    NewCoinComponent,
    NewRegistrationComponent,
    TradeComponent,
    HistoryComponent,
    SellOrdersComponent,
    BuyOrdersComponent,
    PaginationComponent,
    CryptoassetsComponent,
    RegistrationComponent,
    RealStateComponent,
    AutomobileComponent,
    WaterborneVesselComponent,
    AeronauticalVehicleComponent,
    SpacecraftComponent,
    HouseComponent,
    BusinessComponent,
    OpenOrdersComponent,
    MarriageRegistrationComponent,
    BirthCertificateComponent,
    DeathCertificateComponent,
    WillTestimonialComponent,
    ItemComponent,
  ],
  providers: [AuthService],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxQRCodeModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    MatTooltipModule
    
  ],
})
export class HomeModule {}
