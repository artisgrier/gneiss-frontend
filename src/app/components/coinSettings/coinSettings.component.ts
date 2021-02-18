import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../service/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MymodalComponent } from '../dialogs/modal-basic/my-modal-component/Mymodal.component';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-trade',
    templateUrl: './coinSettings.component.html',
    styleUrls: ['./coinSettings.component.css']
})
export class CoinSettingsComponent implements OnInit {
    @ViewChild("mymodal", { static: false }) mymodal: TemplateRef<any>;
    modalOptions: { backdrop: string; backdropClass: string; };

    public uploader: FileUploader = new FileUploader({ url: environment.v1 + 'uploadCoinImages' });

    price: number;
    abbr: '';
    hash: '';
    address: string;
    name: '';
    history = [];
    /*Buy Coin FormGroup*/

    uploadForm = this.fb.group({
        file: [''],
        coinDescription: [''],
    });

    buyCoinForm = this.fb.group({
        address: ['', Validators.required],
        value: ['', Validators.required],
        price: ['', Validators.required]
    });
    coinDescription: '';
    files: [];
    coinPicture: '';
    isImageS3: false;
    isAllowed: boolean;
    isEditableCoin: boolean;
    s3_bucket: '';
    s3_end_point: '';
    own: number;
    isOwner: boolean;
    decimals: number;
    canMintBurn: boolean;
    privacy: boolean;
    approvedAddresses: [];
    canTransferOwnership: boolean;
    btcAddr: '';
    btcAmt: number;
    ethAmt: number;
    GNEISSAmt: number;
    form: any;
    burnAmt: number;
    mintAmt: number;
    file: { isImageS3: false };
    newOwner: '';
    privacyAddress: '';
    newForm: any;
    secured: boolean;
    constructor(private route: ActivatedRoute, private fb: FormBuilder, private dataService: DataService, private modalService: NgbModal) {
        this.modalOptions = {
            backdrop: 'static',
            backdropClass: 'customBackdrop'
        }
    }

    ngOnInit() {
        this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
            form.append('hash', this.hash); //note comma separating key and value
            form.append('coinDescription', this.form.coinDescription);
        };

        this.form = {
            isImageS3: false,
            coinDescription: ""
        }

        this.approvedAddresses = [];

        this.newForm = {
            newOwner: "",
            privacyAddress: "",
            mintAmt: "",
            burnAmt: ""
        }
        this.route.params.subscribe((params: Params) => {
            this.address = params.address;
            this.buyCoinForm.get('address').patchValue(params.address);
            this.abbr = params.abbr;
            //this.price = params.price;
            //TODO:Price should equal last trade
            this.price = 0;
            this.hash = params.hash;
            this.name = params.name;
            this.getCoinDetails();
        })
    }

    private getCoinDetails() {
        this.dataService.getCoinDetails({ address: this.address }).subscribe((ress: any) => {
            this.uploadForm.controls['coinDescription'].setValue(ress[0].coinDescription);
            this.coinPicture = ress[0].coinPicture;
            this.isImageS3 = ress[0].isImageS3;
            this.isAllowed = ress[0].isAllowed;
            if (ress[0].isEditableCoin) {
                this.isEditableCoin = true;
            }
            else {
                this.isEditableCoin = false;
            }
            this.s3_bucket = ress[0].s3_bucket;
            this.s3_end_point = ress[0].s3_end_point;
            this.form = ress[0];
            this.dataService.getMyBuySellRequests({ address: this.address, hash: this.hash }).subscribe((res: any) => {
                this.decimals = res.decimals;
                this.isOwner = res.isOwner;
                this.canMintBurn = res.canMintBurn;
                this.privacy = res.isPrivate;
                this.approvedAddresses = res.approvedAddresses;
                this.canTransferOwnership = res.canTransferOwnership;
                this.btcAddr = res.btcAddress;
                this.btcAmt = res.btcAmt;
                this.ethAmt = res.ethAmt;
                this.GNEISSAmt = res.GNEISSAmt;
            });
        });
    }

    uploadImage() {
        const formData = new FormData();
        formData.append('file', this.uploadForm.get('file').value);
        formData.append('coinDescription', this.uploadForm.controls['coinDescription'].value);
        formData.append('hash', this.hash);
        this.dataService.uploadCoinImages(formData).subscribe((res: any) => {
            this.open(this.mymodal, { title: "Success", content: res });
        }, (err: any) => {
            if (err.status === 200) {
                this.open(this.mymodal, { title: "Success", content: err.error.text })
            }
            else {
                if (err.error.text) this.open(this.mymodal, { title: "Error", content: err.error.text });
                else this.open(this.mymodal, { title: "Error", content: err.error });
            }
        });
    }

    onFileSelect(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.uploadForm.get('file').setValue(file);
        }
    }

    open(content, msg) {
        const modalRef = this.modalService.open(MymodalComponent);
        modalRef.componentInstance.my_modal_title = msg.title;
        modalRef.componentInstance.my_modal_content = msg.content;
        modalRef.result.then((result) => {
            if (result === 'success') {
               this.getCoinDetails();
            }
        });
    }

    goBack() {
        window.history.back();
    };

    roundNumber(n) {
        if (n) {
            return +(n.toFixed(12))
        } else {
            return 0;
        }
    }

    insertDecimal(num, decimals, keepDecimals) {
        if (!decimals || isNaN(decimals)) decimals = 0;
        var number = num / Math.pow(10, decimals);
        if (!keepDecimals) {
            if (number && !isNaN(number)) {
                if (number < 1000000000) {
                    if (number.toString().split(".").length == 2) {
                        return number.toString().substring(0, 9).split(".")[0];
                    } else {
                        return number.toString();
                    }
                } else {
                    return Math.floor(number).toString();
                }
            } else {
                return 0;
            }
        } else {
            return number.toFixed(8);
        }
    }

    mintCoin = function () {
        this.dataService.mintCoin({ address: this.address, amt: (this.newForm.mintAmt * Math.pow(10, this.decimals)) }).subscribe((res: any) => {
            this.open(this.mymodal, { title: "Success", content: res });
            this.router.navigate['/home/client-home'];
        }, (err: any) => {
            if (err.error.text) this.open(this.mymodal, { title: "Error", content: err.error.text });
            else this.open(this.mymodal, { title: "Error", content: err.error });;
        });
    }

    burnCoin = function () {
        this.dataService.burnCoin({ address: this.address, amt: (this.newForm.burnAmt * Math.pow(10, this.decimals)) }).subscribe((res: any) => {
            this.open(this.mymodal, { title: "Success", content: res });
            this.router.navigate['/home/client-home'];
        }, (err: any) => {
            if (err.error.text) this.open(this.mymodal, { title: "Error", content: err.error.text });
            else this.open(this.mymodal, { title: "Error", content: err.error });;
        });
    }

    removeCoin = function () {
        this.dataService.removeCoin({ hash: this.hash }).subscribe((res: any) => {
            this.open(this.mymodal, { title: "Success", content: res });
            this.router.navigate['/home/client-home'];
        }, (err: any) => {
            if (err.error.text) this.open(this.mymodal, { title: "Error", content: err.error.text });
            else this.open(this.mymodal, { title: "Error", content: err.error });;
        });
    }

    transferOwnership = function () {
        this.dataService.transferOwnershipOfCoin({ address: this.address, newOwner: this.newForm.newOwner }).subscribe((res: any) => {
            this.open(this.mymodal, { title: "Success", content: res });
            this.router.navigate['/home/client-home'];
        }, (err: any) => {
            if (err.error.text) this.open(this.mymodal, { title: "Error", content: err.error.text });
            else this.open(this.mymodal, { title: "Error", content: err.error });;
        });
    }

    addPrivacyAddress = function () {
        this.dataService.addPrivacyAddress({ hash: this.hash, address: this.newForm.privacyAddress }).subscribe((res: any) => {
            this.open(this.mymodal, { title: "Success", content: res });
            location.reload();
        }, (err: any) => {
            if (err.error.text) this.open(this.mymodal, { title: "Error", content: err.error.text });
            else this.open(this.mymodal, { title: "Error", content: err.error });;
        });
    }

    removePrivacyAddress = function (addressToDelete) {
        this.dataService.removePrivacyAddress({ hash: this.hash, address: addressToDelete }).subscribe((res: any) => {
            this.open(this.mymodal, { title: "Success", content: res });
            location.reload();
        }, (err: any) => {
            if (err.error.text) this.open(this.mymodal, { title: "Error", content: err.error.text });
            else this.open(this.mymodal, { title: "Error", content: err.error });;
        });
    }
}
