import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  Pagination,
  paginationData,
  SharedService,
} from "src/app/service/shared.service";

@Component({
  selector: "app-buy-orders",
  templateUrl: "./buy-orders.component.html",
  styleUrls: ["./buy-orders.component.css"],
})
export class BuyOrdersComponent implements OnInit {
  pagination: Pagination = { ...paginationData, perPage: 12 };

  @Input() buyRequests: any[];
  @Input() decimals;
  @Input() actualType;

  @Output() setSellCoinPrice = new EventEmitter<{ price: number; i: number }>();

  constructor(public sharedService: SharedService) {}

  ngOnInit() {
    console.log("buy init");
    this.buyRequests = this.buyRequests.map((item, i) => {
      item = { ...item, count: i + 1 };
      return item;
    });

    this.pageSet(0, this.pagination.perPage);
    this.pagination.pageLength = this.buyRequests.length;
  }

  pageSet(start: number, end: number) {
    this.pagination.pageData = this.buyRequests.slice(start, end);
  }

  onsetSellCoinPrice(price, i) {
    this.setSellCoinPrice.next({ price: price, i: i });
  }
}
