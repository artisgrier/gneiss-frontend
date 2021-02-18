import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { WhitePaperComponent } from './white-paper/white-paper.component';
import { ApiDocumentationComponent } from './api-documentation/api-documentation.component';
import { FeesComponent } from './fees/fees.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'white-paper', component: WhitePaperComponent },
  { path: 'fees', component:  FeesComponent},
  { path: 'privacy', component:  PrivacyComponent},
  { path: 'terms', component:  TermsOfUseComponent},
  { path: 'contact', component:  ContactUsComponent},
  { path: 'about', component: AboutComponent },
  { path: 'api-doc', component:  ApiDocumentationComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
