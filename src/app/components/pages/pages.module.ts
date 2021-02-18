import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { NgxQRCodeModule } from 'ngx-qrcode2';
import { WhitePaperComponent } from './white-paper/white-paper.component';
import { FeesComponent } from './fees/fees.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutComponent } from './about/about.component';
import { AuthService } from 'src/app/service/auth.service';
import { ApiDocumentationComponent } from './api-documentation/api-documentation.component';


@NgModule({
  declarations: [
    WhitePaperComponent,
    FeesComponent, 
    PrivacyComponent,
    TermsOfUseComponent,
    ContactUsComponent,
    AboutComponent,
    ApiDocumentationComponent
  ],
  providers: [AuthService],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],

})
export class PagesModule { }
