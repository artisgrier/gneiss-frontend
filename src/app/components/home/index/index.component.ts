import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { DataService } from "../../../service/data.service";
import { MymodalComponent } from "../../dialogs/modal-basic/my-modal-component/Mymodal.component";
import {
  Pagination,
  paginationData,
  SharedService,
} from "src/app/service/shared.service";


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})

export class IndexComponent implements OnInit {
	@ViewChild("mymodal", {static:false}) mymodal: TemplateRef<any>;
	modalOptions: { backdrop: string; backdropClass: string; };
	
	draggable = {
	    data: "coin",
	    effectAllowed: "move",
	  };
	coins:[];
	exchangeAddress:"";
	exchangeInfo:any;
	exchangeName:"";
	btcInfo: { balance: number, btcInExchange: number, txs: Array<number> };
	totalValueOfExchange=0.0;
	totalValueOfExchangeETH;
	isAllowed:false;
	lightningInfo: { balance: number, enabled: boolean };
	raidenInfo: { balance: number, enabled: boolean };
	gridOrList:true;
	registrations:any = [];
	registrationGridOrList: boolean = true;

  constructor(private dataService: DataService,private modalService: NgbModal, private config:NgbModalConfig, public sharedService: SharedService) {
		config.centered = true;
		this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
	 }


  ngOnInit() {
		
		this.lightningInfo = { balance: 0, enabled: false };
		this.btcInfo = { balance: 0, btcInExchange: 0, txs: [0] };
		this.exchangeInfo = { balance: 0 }

	  this.gridOrList=true;
	  this.dataService.getExchangeInfo().subscribe((res:any) => {
        this.coins = res.tokens;
        this.exchangeAddress = res.exchangeAddress;
        this.exchangeInfo = res.exchangeInfo;
        this.btcInfo = res.btcInfo;
        this.totalValueOfExchange = Math.round(res.totalValueOfExchange * 100000) / 100000;
        this.totalValueOfExchangeETH = Math.round(res.totalValueOfExchangeETH * 100000) / 100000;
        this.exchangeName = res.exchangeName;
        this.isAllowed = res.isAllowed;
        this.lightningInfo = res.lightningInfo;
        this.raidenInfo = res.raidenInfo;
		this.registrations = res.registrations;
      }, (err) => {
					this.open(this.mymodal, {title:"Error", content:err.error});
      });
	}
	
	setGridOrList(gol) {
      this.gridOrList = gol;
	}

  setRegistrationGridOrList(gol) {
    this.registrationGridOrList = gol;
  }
	
  open(content, msg) {
    const modalRef = this.modalService.open(MymodalComponent);
    modalRef.componentInstance.my_modal_title = msg.title;
    modalRef.componentInstance.my_modal_content = msg.content;
  }
	
	reorderCoin(i:number) {
        this.coins.splice(i, 1);
        var hashes = [];
        for (var i = 0; i < this.coins.length; i++) {
	        hashes.push(this.coins[i]!["hash"]);
        }
        this.dataService.reorderCoins({coins:hashes}).subscribe((res:any) => {
	        console.log(res);
	    }, (err) => {
			console.log(err);
	    });
    }
    
    roundNumber(n) {
        if (n) {
            return +(n.toFixed(12))
        } else {
            return 0;
        }
    }

}
