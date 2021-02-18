import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { EventService } from './service/event.service';
import { environment } from 'src/environments/environment';
import * as jquery from 'jquery';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { MymodalComponent } from './components/dialogs/modal-basic/my-modal-component/Mymodal.component';
import { interval as observableInterval } from "rxjs";
import { AuthService } from './service/auth.service';
import { SharedService } from './service/shared.service';



declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit, OnDestroy {
  @ViewChild("mymodal", { static: false }) mymodal: TemplateRef<any>;

  closeResult: string;
  modalOptions: NgbModalOptions;

  getMessages: any;
  title = 'gniess';
  elementType: 'url' | 'canvas' | 'img' = 'url';
  authSubscription: any;

  ngOnDestroy(): void {
    if (this.getMessages)
      this.getMessages.unsubscribe();
    if (this.authSubscription)
      this.authSubscription.unsubscribe();
  }
  ngOnInit(): void {

    this.authService.subscribeToAuthCheck();

    this.authSubscription = observableInterval(this.sharedService.pollingInterval).subscribe(x => {
      this.eventService.announceCheckAuth();
    });

    this.getMessages = this.eventService.announceSendMessages$.subscribe(
      error => {
        if (!environment.production) {
          setTimeout(() => {
            this.showMessage(error);
          }, 0);
        } else {
          console.log("error:", error);
        }
      }
    );
  }


  private showMessage(error) {
    // console.log(jquery);
    $.growl({
      title: "",
      message: error,
      style: "error"
    });
  }

  open(content) {
    const modalRef = this.modalService.open(MymodalComponent);
    modalRef.componentInstance.my_modal_title = 'I your title';
    modalRef.componentInstance.my_modal_content = 'I am your content';
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  constructor(
    private eventService: EventService, 
    private modalService: NgbModal, 
    private authService:AuthService,
    private sharedService: SharedService) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
  }


}

