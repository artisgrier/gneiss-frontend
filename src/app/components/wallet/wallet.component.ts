import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DataService } from '../../service/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { MymodalComponent } from '../dialogs/modal-basic/my-modal-component/Mymodal.component';

@Component({
	selector: 'app-wallet',
	templateUrl: './wallet.component.html',
	styleUrls: ['./wallet.component.css'],
})
export class WalletComponent implements OnInit {
	@ViewChild("mymodal", { static: false }) mymodal: TemplateRef<any>;
	modalOptions: { backdrop: string; backdropClass: string; };

	constructor(private fb: FormBuilder, private dataService: DataService, private modalService:NgbModal, private config:NgbModalConfig) {
		config.centered = true;
		this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
	 }

	btcAddress = "";
	exchangeAddress = "";

	btcInfo: { balance: number, btcInExchange: number, txs: Array<number> };
	exchangeInfo: { balance: number };
	lightningInfo: { balance: number, enabled: boolean };
	raidenInfo: { balance: number, enabled: boolean };

	LNInvoice = "";
	LNAmount = "";
	lightningAddress = "";
	LNInvoiceInfo = "";
	newLNInvoice = "";

	sendBtcForm = this.fb.group({
		amt: 0,
		to: ""
	});

	sendEthForm = this.fb.group({
		amt: 0,
		to: ""
	});

	showInvoice = false;

	open(content, msg) {
		const modalRef = this.modalService.open(MymodalComponent);
		modalRef.componentInstance.my_modal_title = msg.title;
		modalRef.componentInstance.my_modal_content = msg.content;
	  }
	

	setShowInvoice(b) {
		this.showInvoice = b;
	}

	getWalletInfo() {
		this.dataService.getWalletInfo().subscribe((res: any) => {
			this.btcAddress = res.btcAddress;
			this.exchangeAddress = res.exchangeAddress;
			this.btcInfo = res.btcInfo;
			this.exchangeInfo = res.exchangeInfo;
			this.lightningInfo = res.lightningInfo;
			this.lightningAddress = res.lightningAddress;
			this.raidenInfo = res.raidenInfo;
		}, (err) => {
			console.log(err);
			console.log("error");
		});
	}

	ngOnInit() {
		this.btcInfo = { balance: 0, btcInExchange: 0, txs: [0] };
		this.exchangeInfo = { balance: 0 }
		this.lightningInfo = { balance: 0, enabled: false }
		this.raidenInfo = { balance: 0, enabled: false }
		this.getWalletInfo();
	}

	roundNumber(n) {
		if (n) {
			return +(n.toFixed(12))
		} else {
			return 0;
		}
	}

	sendBTC() {
		const dataToSend = {
			amt: this.sendBtcForm.get('amt').value,
			to: this.sendBtcForm.get('to').value
		}

		if (!this.lightningInfo.enabled) {
			this.dataService.withdrawBitcoin(dataToSend).subscribe((res: any) => {
				
				if(res.success) {
				      this.open(this.mymodal, {title:"Success", content:res.message});
				  } else {
					  this.open(this.mymodal, {title:"Error", content:res.message});
				  }
			}, (err:any) => {
				err=err.error;
				if(err.success) {
				      this.open(this.mymodal, {title:"Success", content:err.message});
				  } else {
					  this.open(this.mymodal, {title:"Error", content:err.message});
				  }
			});
		} else {
			this.dataService.withdrawLightning(dataToSend).subscribe((res: any) => {
				if(res)
				this.open(this.mymodal, {title:"Success", content:res.message});;
			}, (err) => {
				if (err.status == 200) {
					this.open(this.mymodal, {title:"Success", content:err.error.text});
				} else {
					this.open(this.mymodal, {title:"Error", content:err.error});;
				}
			});
		}
	}

	sendETH() {
		const dataToSend = {
			amt: this.sendEthForm.get('amt').value,
			to: this.sendEthForm.get('to').value
		}

		this.dataService.withdrawEthereum(dataToSend).subscribe((res: any) => {
			if(res.success) {
			      this.open(this.mymodal, {title:"Success", content:res.message});
			  } else {
				  this.open(this.mymodal, {title:"Error", content:res.message});
			  }
		}, (err:any) => {
			err=err.error;
				if(err.success) {
			      this.open(this.mymodal, {title:"Success", content:err.message});
			  } else {
				  this.open(this.mymodal, {title:"Error", content:err.message});
			  }
		});
	}

	enableLN() {
		if (confirm("Lightning Network enables faster transaction with almost no fees. To Enable Lightning Network, your bitcoin will be transferred to a lightning channel, which may involve a fee, and the funds may take an hour to confirm. Continue with enabling Lightning Network?")) {

			this.dataService.enableLN({}).subscribe((res: any) => {
				this.open(this.mymodal, {title:"Success", content:res});
				this.getWalletInfo();
			}, (err) => {
				if (err.error && err.error.text) {
					this.open(this.mymodal, {title:"Error", content:err.error.text});
				} else {
					this.open(this.mymodal, {title:"Error", content:err.error});;
				}
			});
		}
	}

	turnOffLN() {
		if (confirm("This will turn off Lightning Network and switch your account to normal bitcoin. If there are enough Lightning Network funds in your wallet, they will be converted to bitcoin and deposited in your bitcoin wallet. Continue with disabling Lightning Network?")) {
			this.dataService.turnOffLN({}).subscribe((res: any) => {
				this.open(this.mymodal, {title:"Success", content:res});
				this.getWalletInfo();
			}, (err) => {
				if (err.error && err.error.text) {
					this.open(this.mymodal, {title:"Error", content:err.error.text});
				} else {
					this.open(this.mymodal, {title:"Error", content:err.error});;
				}
			});
		}
	}

	getLightningInvoiceInfo() {
		if (this.LNInvoice) {
			this.dataService.getLightningInvoiceInfo({ pay_req: this.LNInvoice }).subscribe((res: any) => {
				if (res.amt && res.to) {
					this.LNInvoiceInfo = "Send " + res.amt + " to " + res.to;
				} else {
					this.LNInvoiceInfo = null;
				}
			}, (err) => {
				this.LNInvoiceInfo = null;
				if (err.error && err.error.text) {
					this.open(this.mymodal, {title:"Error", content:err.error.text});
				} else {
					this.open(this.mymodal, {title:"Error", content:err.error});;
				}
			});
		} else {
			this.LNInvoiceInfo = null;
		}
	}

	payLNInvoice() {
		this.dataService.payLNInvoice({ LNInvoice: this.LNInvoice }).subscribe((res: any) => {
			this.open(this.mymodal, {title:"Success", content:res});
			this.getWalletInfo();
		}, (err) => {
			if (err.error && err.error.text) {
				this.open(this.mymodal, {title:"Error", content:err.error.text});
			} else {
				this.open(this.mymodal, {title:"Error", content:err.error});;
			}
		});
	}

	createLNInvoice() {
		this.dataService.createLNInvoice({ amount: this.LNAmount }).subscribe((res: any) => {
			this.newLNInvoice = res.payReq;
		}, (err) => {
			if (err.error && err.error.text) {
				this.open(this.mymodal, {title:"Error", content:err.error.text});
			} else {
				this.open(this.mymodal, {title:"Error", content:err.error});;
			}
		});
	}

	copyToClipboard() {
		var str = (document.getElementById("newLNInvoice") as HTMLInputElement).value;
		const el = document.createElement('textarea');  // Create a <textarea> element
		el.value = str;                                 // Set its value to the string that you want copied
		el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
		el.style.position = 'absolute';
		el.style.left = '-9999px';                      // Move outside the screen to make it invisible
		document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
		const selected =
			document.getSelection().rangeCount > 0        // Check if there is any content selected previously
				? document.getSelection().getRangeAt(0)     // Store selection if found
				: false;                                    // Mark as false to know no selection existed before
		el.select();                                    // Select the <textarea> content
		document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
		document.body.removeChild(el);                  // Remove the <textarea> element
		if (selected) {                                 // If a selection existed before copying
			document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
			document.getSelection().addRange(selected);   // Restore the original selection
		}
	}

}
