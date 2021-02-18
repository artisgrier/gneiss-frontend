import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../../service/data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { MymodalComponent } from '../../dialogs/modal-basic/my-modal-component/Mymodal.component';

@Component({
  selector: 'app-new-coin',
  templateUrl: './new-coin.component.html',
  styleUrls: ['./new-coin.component.css']
})
export class NewCoinComponent implements OnInit {
  @ViewChild("mymodal", { static: false }) mymodal: TemplateRef<any>;
  modalOptions: { backdrop: string; backdropClass: string; };

  fields = ["canMintBurn", "coinAmt", "decimals", "holdingTax",
    "holdingTaxBool", "holdingTaxInterval", "nameType", "privacy", "secured"
    , "txnTax", "txnTaxBool", "secured", "privacy"]; // coinTemplate

  public show: boolean = false;


  // customName, customAbbreviation 

  newCoinForm = this.fb.group({
    nameType: ["custom"],
    custom: this.fb.group({ name: [''], abbr: [''] }),
    import: this.fb.group({ importAddress: [''] }),
    canMintBurn: ['false'],
    privacy: ['false'],
    coinAmt: ['', Validators.required],
    decimals: [0],
    txnTax: [0],
    txnTaxBool: ['false'],
    holdingTaxBool: ['false'],
    secured: ['false',],
    holdingTax: [0],
    holdingTaxInterval: ['1'],
    interest: [''],
  });

  constructor(private fb: FormBuilder, private dataService: DataService, public router: Router, private modalService:NgbModal,private config:NgbModalConfig) {
    config.centered = true;
   }

  ngOnInit() {
  }

  
  open(content, msg) {
    const modalRef = this.modalService.open(MymodalComponent);
    modalRef.componentInstance.my_modal_title = msg.title;
    modalRef.componentInstance.my_modal_content = msg.content;
    }
  

  toggle() {
    this.show = !this.show;
  }

  handleSubmit() {
    const data = {};
    this.fields.forEach((item, index) => {
      if (this.newCoinForm.get(item))
        data[item] = this.newCoinForm.get(item).value;
      else
        console.log(item + " not found");
    });

    // importAddress

    const dataToSend = {
      canMintBurn: this.newCoinForm.get('canMintBurn').value == 'true', // false 
      coinAmt: this.newCoinForm.get('coinAmt').value, // 1 
      coinTemplate: "gold",
      importAddress: (this.newCoinForm.get('import').value).importAddress,
      customAbbreviation: (this.newCoinForm.get('custom').value).abbr,
      customName: (this.newCoinForm.get('custom').value).name,
      decimals: this.newCoinForm.get('decimals').value,
      holdingTax: this.newCoinForm.get('holdingTax').value,
      holdingTaxBool: this.newCoinForm.get('holdingTaxBool').value == 'true',
      holdingTaxInterval: this.newCoinForm.get('holdingTaxInterval').value,
      nameType: this.newCoinForm.get('nameType').value,
      privacy: this.newCoinForm.get('privacy').value == 'true',
      secured: this.newCoinForm.get('secured').value == 'true',
      txnTax: this.newCoinForm.get('txnTax').value,
      txnTaxBool: this.newCoinForm.get('txnTaxBool').value == 'true',
      crypto: [
        { name: "Bitcoin", percentage: 0, user: false },
        { name: "Ethereum", percentage: 0, user: false }
      ],
      physical: [
        { name: "Gold", percentage: 0, user: false },
        { name: "Silver", percentage: 0, user: false },
      ]
    };

    if (dataToSend.nameType == "custom") {
      delete (dataToSend.importAddress);
    }
    else {
      delete (dataToSend.customName);
      delete (dataToSend.customAbbreviation);
    }

    this.dataService.createNewCoin(dataToSend).subscribe((res: any) => {
      this.open(this.mymodal, { title: "Success", content: res.message });
      return this.router.navigate(['/home/client-home']);
    }, (err) => {
      this.open(this.mymodal, { title: "Error", content: err.error.message });;
    });

  }

  validateForm() {

    // registerForm = this.fb.group({
    //     firstName: ['', Validators.required],
    //     lastName: ['', Validators.required],
    //     userName: ['', Validators.required],
    //     email: ['', Validators.compose([Validators.required, Validators.email])],
    //     password: ['', Validators.compose([Validators.minLength(6)])],
    //     country: ['', Validators.required],
    //     birthday: ['', Validators.required],
    //     exchangeName: ['', Validators.required],
    //     gender: ['', Validators.required],
    //     privacyPolicy: ['', Validators.required],
    //     termsAndConditions: ['', Validators.required],
    //     referrer: [''],
    //   });

  }

}
