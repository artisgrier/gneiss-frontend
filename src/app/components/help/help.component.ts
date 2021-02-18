import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DataService } from '../../service/data.service';
import {FormBuilder, Validators} from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { MymodalComponent } from '../dialogs/modal-basic/my-modal-component/Mymodal.component';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  @ViewChild("mymodal", {static:false}) mymodal: TemplateRef<any>;
  modalOptions: { backdrop: string; backdropClass: string; };

  constructor(private fb: FormBuilder, private dataService: DataService,private modalService: NgbModal, private config:NgbModalConfig) {
    config.centered = true;
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
   }

  form:any = {
	  fname:"",
	  lname:"",
	  emailaddress:"",
	  problem:"",
	  typeofissue:1,
	  specify:"",
	  refferedURL:"/"
  }
  ngOnInit() {
  }

  open(content, msg) {
    const modalRef = this.modalService.open(MymodalComponent);
    modalRef.componentInstance.my_modal_title = msg.title;
    modalRef.componentInstance.my_modal_content = msg.content;
  }
  
  help() { 
	    this.dataService.help({fname:this.form.fname, lname:this.form.lname, emailaddress:this.form.emailaddress, problem:this.form.problem, typeofissue:this.form.typeofissue, specify:this.form.specify, refferedURL:this.form.refferedURL}).subscribe((res: any)=>{
        		if(res.success) {
				      this.open(this.mymodal, {title:"Success", content:res.message});
				  } else {
					  this.open(this.mymodal, {title:"Error", content:res.message});
				  }
		},(err) => { 
			err=err.error;
  			if(err.success) {
				      this.open(this.mymodal, {title:"Success", content:err.message});
				  } else {
					  this.open(this.mymodal, {title:"Error", content:err.message});
				  }
		}); 
    }
    
  doTextareaValueChange1(ev) {
    try {
      this.form.specify = ev.target.value;
    } catch(e) {
      console.info('could not set textarea-value');
    }
  }
  
  doTextareaValueChange2(ev) {
    try {
      this.form.problem = ev.target.value;
    } catch(e) {
      console.info('could not set textarea-value');
    }
  }

}
