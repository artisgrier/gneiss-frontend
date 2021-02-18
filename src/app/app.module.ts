import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { LoaderService } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DndModule } from "ngx-drag-drop";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from "./chart/chart.component";
import { APIComponent } from "./components/api/api.component";
import { MymodalComponent } from "./components/dialogs/modal-basic/my-modal-component/Mymodal.component";
import { HelpComponent } from './components/help/help.component';
import { FooterComponent } from "./components/includes/footer/footer.component";
import { NavbarComponent } from "./components/includes/navbar/navbar.component";
import { LoaderComponent } from './components/shared/loader/loader.component';
import { MyInterceptor } from "./interceptors/httpInterceptor";
import { LoaderInterceptor } from "./interceptors/loader.interceptor";
import { AuthService } from "./service/auth.service";
import { AppErrorHandler } from './service/error.service';
import { EventService } from "./service/event.service";
import { LoaderService } from "./service/loader.service";
import {DragDropModule} from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    APIComponent,
  
    NavbarComponent,
    FooterComponent,

    HelpComponent,
    LoaderComponent,
    MymodalComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DndModule,
    MatProgressSpinnerModule, 
    NgbModule,
    DragDropModule,
    BrowserAnimationsModule
  ],
  entryComponents:[
    MymodalComponent
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true
    },
    EventService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
