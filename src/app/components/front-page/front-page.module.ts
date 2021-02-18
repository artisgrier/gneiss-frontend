import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontPageComponent } from './front-page.component';
import { FrontPageRoutingModule } from './font-page-routing.module';
import { StaticImageService } from 'src/app/service/static-image.service';

@NgModule({
  declarations: [
    FrontPageComponent
  ],
  imports: [
    CommonModule,
    FrontPageRoutingModule
  ],
  
})
export class FrontPageModule { }
