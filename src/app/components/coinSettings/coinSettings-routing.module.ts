import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinSettingsComponent } from './coinSettings.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: "",
    component: CoinSettingsComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoinSettingsRoutingModule { }
