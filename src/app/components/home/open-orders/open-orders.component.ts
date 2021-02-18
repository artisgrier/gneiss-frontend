import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { SharedService } from 'src/app/service/shared.service';


@Component({
	selector: 'app-open-orders',
	templateUrl: './open-orders.component.html',
	styleUrls: ['./open-orders.component.css'],
})
export class OpenOrdersComponent implements OnInit {
	buyerPageData: any=[];
	sellerPageData: any=[];

	constructor(public dataService: DataService) { }
	ngOnInit() {
		this.getBuyerInfo();
		this.getSellInfo();
	}

	getBuyerInfo(){
		this.dataService.getOpenBuysDetail().subscribe(res => {
			this.buyerPageData = res;
		}, (err) => {
			console.log(err);
			console.log("error");
		})
	}

	getSellInfo(){
		this.dataService.getOpenSellDetail().subscribe(res => {
			this.sellerPageData = res;
		}, (err) => {
			console.log(err);
			console.log("error");
		})
	}

	clearAllOpenOrders(){
		this.dataService.clearAllDetails({}).subscribe(res=>{
		}, (err) => {
			console.log(err);
			console.log("error");
		})
		this.getBuyerInfo();
		this.getSellInfo();
	}

	deleteBuyerRecord(data){
		this.dataService.deleteBuyerInfo({'id':data._id}).subscribe(res=>{
		}, (err) => {
			console.log(err);
			console.log("error");
		})
		this.getBuyerInfo();
		this.getSellInfo();
	}

	deleteSellerRecord(data){
		this.dataService.deleteSellerInfo({'id':data._id}).subscribe(res=>{
		}, (err) => {
			console.log(err);
			console.log("error");
		})
		this.getBuyerInfo();
		this.getSellInfo();
	}


}	