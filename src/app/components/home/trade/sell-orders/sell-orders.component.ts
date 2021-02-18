import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  SharedService,
  Pagination,
  paginationData,
} from "src/app/service/shared.service";

@Component({
  selector: "app-sell-orders",
  templateUrl: "./sell-orders.component.html",
  styleUrls: ["./sell-orders.component.css"],
})
export class SellOrdersComponent implements OnInit {
  pagination: Pagination = { ...paginationData, perPage: 12 };

  @Input() sellRequests: any[];
  @Input() actualType;
  @Input() decimals;
  @Input() abbr;

  @Output() setBuyCoinPrice = new EventEmitter<{ price: number; i: number }>();

  constructor(public sharedService: SharedService) {}

  ngOnInit() {
    this.sellRequests = this.sellRequests.map((item, i) => {
      item = { ...item, count: i + 1 };
      return item;
    });
    this.pagination.pageLength = this.sellRequests.length;
    this.pageSet(0, this.pagination.perPage);
    console.log('sell request',this.sellRequests);
  }

  onsetBuyCoinPrice(price, i) {
    this.setBuyCoinPrice.next({ price: price, i: i });
  }

  pageSet(start, end) {
    if(start==0){
      start = 0;
    
    }else{
      start = start -1;
      end = end-1;
    }
    console.log('start',start,'end....',end);
    // console.log('this.pagination',this.pagination.pageData);
    this.pagination.pageData = this.sellRequests.slice(start, end);
    console.log('this.pagination',this.pagination.pageData);
    // localStorage.setItem('pageData', JSON.stringify(this.pagination.pageData));               
  }
}
