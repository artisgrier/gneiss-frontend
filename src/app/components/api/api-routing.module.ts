import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APIComponent } from './api.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: "",
    component: APIComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class APIRoutingModule { }
