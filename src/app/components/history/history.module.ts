import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';




@NgModule({
  declarations: [
    HistoryComponent
  ],
  providers:[],
  imports: [
    CommonModule,
    HistoryRoutingModule,
  ],
  
})
export class HistoryModule { }
