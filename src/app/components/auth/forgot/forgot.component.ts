import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '../../../service/data.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { MymodalComponent } from '../../dialogs/modal-basic/my-modal-component/Mymodal.component';

@Component({
  selector: 'app-register',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  @ViewChild("mymodal", { static: false }) mymodal: TemplateRef<any>;
  modalOptions: { backdrop: string; backdropClass: string; };
  
  register = this.fb.group({
    email: ['', Validators.required]
  });
  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private dataService: DataService,
    public router: Router,
    public route: ActivatedRoute,
    private modalService: NgbModal, private config:NgbModalConfig) {
      config.centered = true;
      this.modalOptions = {
        backdrop:'static',
        backdropClass:'customBackdrop'
      }
     }

 
  ngOnInit() {

  }

  open(content, msg) {
    const modalRef = this.modalService.open(MymodalComponent);
    modalRef.componentInstance.my_modal_title = msg.title;
    modalRef.componentInstance.my_modal_content = msg.content;
  }

  registerSubmit() {
    const registerData = {
      email: this.register.get('email').value,
    };
    // @ts-ignore
    this.dataService.resetPassword(registerData).subscribe((res) => {
      this.open(this.mymodal, {title:"Success", content:"Check Your Email For Further Instructions"});
      this.router.navigate(['login']);
    }, (err) => {
      if (err.status == 200) {
        this.open(this.mymodal, {title:"Success", content:"Check Your Email For Further Instructions"});
        this.router.navigate(['login']);
      } else {
        this.open(this.mymodal, {title:"Error", content:err.error});
      }
    });
  }
}
