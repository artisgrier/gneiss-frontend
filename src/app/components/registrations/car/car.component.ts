import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { DataService } from '../../../service/data.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-wallet',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  constructor(private fb: FormBuilder, private dataService: DataService, private route: ActivatedRoute) { }
  
  carForm:any = {};

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
	    console.log(params.hash);
	    this.dataService.registrationInfo({hash:params.hash}).subscribe((res: any)=>{
		    	console.log(res);
		    	if(res.allInfo) this.carForm = res.allInfo
		    }, (err:any)=>{
			    console.log(err)
		    })
	})
  }

}