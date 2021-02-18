import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {DataService} from '../../service/data.service';
import {Router, RouteConfigLoadEnd} from '@angular/router';
import {environment} from '../../../environments/environment.prod';
import {FormBuilder, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { MymodalComponent } from '../dialogs/modal-basic/my-modal-component/Mymodal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild("mymodal", { static: false }) mymodal: TemplateRef<any>;
	modalOptions: { backdrop: string; backdropClass: string; };

  constructor(private route: Router, private dataService: DataService,private fb: FormBuilder, private modalService:NgbModal,
    private config:NgbModalConfig) {
      config.centered = true;
      this.modalOptions = {
        backdrop:'static',
        backdropClass:'customBackdrop'
      }
     }

  referralString = '';
  /*
  country: {name: "India", code: "IN"}
*/

  profileForm =  this.fb.group({
    exchangeName : [''],
    username: [''],
    email : ['', Validators.compose([Validators.required, Validators.email])],
    firstName : [''],
    lastName : [''],
    gender: ['Male'],
    // secret: [''],
    // secretQR: [''],
    country: [''],
    // success: [''],
    token: [''],
    birthday: [''],
    // referralCode: [''],
    twoFactor: ['false'],
    password : ['', Validators.compose([Validators.minLength(6)])],
    oldPassword : ['', Validators.compose([Validators.minLength(6)])],
    confirmPassword : ['', Validators.compose([Validators.minLength(6)])],
  });
  id = '1'
  referralCode = ''
  secret = ''
  secretQR = '';
  country = {name: "India", code: "IN"};
  twoFactor = false;
  basisIDConfirmed = false;
  userHasPaidBASIS = false;

  ngOnInit() {
    this.callProfile();
  }

  open(content, msg) {
		const modalRef = this.modalService.open(MymodalComponent);
		modalRef.componentInstance.my_modal_title = msg.title;
		modalRef.componentInstance.my_modal_content = msg.content;
	  }
	
  callProfile() {

      const profileForm = this.profileForm;
      this.dataService.userHasPaidBASIS({}).subscribe((ress: any) => {
	      this.userHasPaidBASIS = (ress==true);
	      console.log(this.userHasPaidBASIS);
	      this.dataService.getSettingsInfo().subscribe((res: any) => {
	          this.id = res._id;
	          this.referralCode = res.referralCode
	          this.secret = res.secret;
	          this.secretQR  = res.secretQR;
	          this.twoFactor  = res.twoFactor;
	          this.country = res.country;
	          this.basisIDConfirmed = res.basisIDConfirmed;
	          const fields = ['exchangeName','lastName', 'firstName', 'email', 'gender' ];
	          fields.map((item, index) => {
	            profileForm.get(item).setValue(res[item]);
	          });
	
			  profileForm.get('country').setValue(res.country.name);
	          // new Date(this.profileForm.get('birthday').value).toDateString();
	
	          this.profileForm.get('birthday').setValue(this.formatDate(res.birthday));
	          this.referralString = environment.baseURL + '#/auth/register?referrer='+res.referralCode;
	      },(err) => {
		      this.open(this.mymodal, {title:"Error", content:err.error.message});
	      });
      })
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + (d.getDate()+1),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  submitProfileForm() {

    this.submitProfileForm2FA(this.twoFactor);

  }
  
  submitProfileForm2FA(TwoFactorAuth) {
	  const data = {
      exchangeName : this.profileForm.get('exchangeName').value,
      username: this.profileForm.get('exchangeName').value,
      email : this.profileForm.get('email').value,
      firstName : this.profileForm.get('firstName').value,
      lastName :  this.profileForm.get('lastName').value,
      gender: this.profileForm.get('gender').value,
      Gender: this.profileForm.get('gender').value,
      token: this.profileForm.get('token').value,

      password : this.profileForm.get('password').value,
      oldPassword :  this.profileForm.get('oldPassword').value,
      confirmPassword : this.profileForm.get('confirmPassword').value,

      secret: this.secret,
      secretQR: this.secretQR,
      country : this.country,
      success: true,
      birthday: new Date(this.profileForm.get('birthday').value),
      referralCode: this.referralCode,
      twoFactor: TwoFactorAuth,
      _id: this.id
    };
    //console.log([data.birthday,this.profileForm.get('birthday').value]);
    //return;

    // const tempData = {
    //   "country":{"name":"Anguilla","code":"AI"},   // done
    //   "firstName":"Yateesh",                       // done
    //   "lastName":"Bhardwaj",                       // done
    //   "email":"george@plebiscite.in",              // done
    //   "exchangeName":"username",                   // done
    //   "gender":"Male",                             // done
    //   "password":"123456",                         // done
    //   "confirmPassword":"123456",                  // done
    //   "oldPassword":"123456",                      // done
    //   "token":"123456",
    //   "birthday":"1994-11-22T18:30:00.000Z"
    // };

    this.dataService.submitProfile(data).subscribe((res: any) => {
        this.open(this.mymodal, {title:"Success", content:res.message});;
        window.location.reload();
    }, (err: any) => {
	    this.open(this.mymodal, {title:"Error", content:err.error.message});;
    });
  }
  
  disableTwoFactor() {
	  this.submitProfileForm2FA(false);
  }
  
  closeModal = function(type) {
    if(type == 'btc' || type == 'eth'){
        this.dataService.chargeUserBASIS({type:type}).subscribe((res: any) => {
                if(res.status == 200){
                    window.location.reload();
                } else {
                    this.open(this.mymodal, {title:"Error", content:res.message});
                }
            }, (err: any) => {
	            if(err.error && err.error.message){
		            this.open(this.mymodal, {title:"Error", content:err.error.message});
	            } else if(err.error) {
		            this.open(this.mymodal, {title:"Error", content:err.error});
	            } else {
		            this.open(this.mymodal, {title:"Error", content:"Transaction Incomplete!"});
	            }
                window.location.reload();
            });

    }else {
        //Hide BasisId
        this.open(this.mymodal, {title:"Error", content:"An Error Occurred"});
        window.location.reload();
    }
  }
}
