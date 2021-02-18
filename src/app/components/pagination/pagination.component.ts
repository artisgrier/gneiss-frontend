import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Pagination } from "src/app/service/shared.service";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"],
})
export class PaginationComponent implements OnInit {
  @Input() pagination: Pagination = null;

  @Output() pageSet = new EventEmitter<{ start: number; end: number }>();

  constructor() {}

  ngOnInit() {
    this.setPageData(0, this.pagination.perPage, this.pagination.currentPage);
  }

  goToFirstPage() {
    this.pagination.currentPage = 1;
    this.setPageData(0, this.pagination.perPage, 1);
  }

  goToLastPage() {
    this.pagination.currentPage = Math.ceil(
      this.pagination.pageLength / this.pagination.perPage
    );

    let mod =
      this.pagination.pageLength -
      (this.pagination.pageLength % this.pagination.perPage);

    console.log("mod", mod);

    mod =
      mod == this.pagination.pageLength
        ? this.pagination.pageLength - this.pagination.perPage
        : mod;

    console.log("mod", mod);

    this.setPageData(
      mod,
      this.pagination.pageLength,
      this.pagination.currentPage
    );
  }

  // on click next page
  next(nextCount) {
    let pages = this.pagination.currentPage * this.pagination.perPage;
    if (pages < this.pagination.pageLength) {
      this.pagination.currentPage += nextCount;
      let start =
        nextCount == 1
          ? pages
          : pages + this.pagination.perPage * (nextCount - 1);
      let end = start + this.pagination.perPage;
      this.setPageData(start, end, this.pagination.currentPage);
    }
  }

  // on click previouse page
  previouse(prevCount) {
    let pages = this.pagination.currentPage * this.pagination.perPage;
    if (pages > this.pagination.perPage) {
      this.pagination.currentPage -= prevCount;
      let end = pages - this.pagination.perPage * prevCount;
      let start = end - this.pagination.perPage;
      this.setPageData(start, end, this.pagination.currentPage);
    }
  }

  // set Pagination Data
  setPageData(start, end, currentPage) {
    this.pagination.hasNext =
      this.pagination.pageLength > this.pagination.perPage * currentPage;
    this.pagination.hasPrev =
      this.pagination.perPage < this.pagination.perPage * currentPage;
    this.pagination.hasNext2 =
      this.pagination.pageLength > this.pagination.perPage * (currentPage + 1);
    this.pagination.hasPrev2 =
      this.pagination.perPage < this.pagination.perPage * (currentPage - 1);
    this.pageSet.next({ start: start, end: end });
  }
}
