import { Component, OnInit, Input } from "@angular/core";
import {
  SharedService,
  Pagination,
  paginationData,
} from "src/app/service/shared.service";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.css"],
})
export class HistoryComponent implements OnInit {
  pagination: Pagination = { ...paginationData, perPage: 12 };

  @Input() history: any[];
  @Input() decimals;
  @Input() abbr;
  @Input() actualType;

  constructor(public sharedService: SharedService) {}

  ngOnInit() {
    this.history = this.history.map((item, i) => {
      item = { ...item, count: i + 1 };
      return item;
    });
    this.pageSet(0, this.pagination.perPage);
    this.pagination.pageLength = this.history.length;
    console.log("this.history.length", this.history);
  }
  pageSet(start: number, end: number) {
    this.pagination.pageData = this.history.slice(start, end);
  }
}
