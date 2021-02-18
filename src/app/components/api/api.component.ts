import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DataService } from '../../service/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { MymodalComponent } from '../dialogs/modal-basic/my-modal-component/Mymodal.component';

@Component({
	selector: 'app-api',
	templateUrl: './api.component.html',
	styleUrls: ['./api.component.css'],
})
export class APIComponent implements OnInit {
	@ViewChild("mymodal", { static: false }) mymodal: TemplateRef<any>;
	modalOptions: { backdrop: string; backdropClass: string; };

	constructor(private fb: FormBuilder, private dataService: DataService, private modalService:NgbModal, private config:NgbModalConfig) {
		config.centered = true;
		this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
	 }
	 
	 apiKeys=[];
	 
	 ngOnInit() {
		 this.getWalletInfo();
		 
	 }

	getWalletInfo() {
		this.dataService.apiInfo().subscribe((res: any) => {
			this.apiKeys=res;
		}, (err) => {
			if(err.error) alert(err.error)
		});
	}
	
	makeNewAPIKey() {
		this.dataService.makeNewAPIKey({}).subscribe((res: any) => {
			this.getWalletInfo();
		}, (err) => {
			if(err.status==200) this.getWalletInfo();
			else if(err.error) alert(err.error)
		});
	}
	
	deleteAPIKey(d) {
		this.dataService.deleteAPIKey({key:d}).subscribe((res: any) => {
			this.getWalletInfo();
		}, (err) => {
			if(err.status==200) this.getWalletInfo();
			else if(err.error) alert(err.error)
		});
	}

}
