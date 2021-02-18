import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../../service/data.service";
import { SharedService } from "src/app/service/shared.service";

@Component({
  selector: "app-marketplace",
  templateUrl: "./marketplace.component.html",
  styleUrls: ["./marketplace.component.css"],
})
export class MarketplaceComponent implements OnInit {
  actualArray: any = [];
  tempSearchArray: any = [];
  currencyArray = [];
  page: number = 0;
  type: string = "BTC";
  actualType: string = "BTC";
  searchText: any = "";
  originalTypes = ["BTC", "USDT", "ETH", "GNEISS"];
  pages: any = [];

  currentPage = 1;
  totalPages: number = 5;
  items = [];

  constructor(
    private route: Router,
    private dataService: DataService,
    public sharedService: SharedService
  ) {}

  ngOnInit() {
    this.type = "BTC";
    this.actualType = "BTC";
    this.fetchMarketPlaceData();
  }

  attachDataToList(list, exist = false) {
    const index = this.originalTypes.indexOf(this.type);
    // console.log("attach data list + index "+ index +" " +this.actualType);
    if (exist === false) {
      if (index !== -1) {
        this.actualArray[this.actualType] = list;
      }
    }

    if (index !== -1)
      this.totalPages = Number(this.actualArray[this.actualType].length / 50);
    else {
      list.map((item) => {
        item.total = item.total.toFixed(12);
        this.tempSearchArray.push(item);
      });
      this.totalPages = Number(this.tempSearchArray.length / 50);
    }

    //this.getArrayOfLength();
    this.currencyArray = this.actualArray[this.actualType].slice(0);
  }

  fetchMarketPlaceData() {
    this.dataService.getMarketplacePriceInfo().subscribe(
      (ress: any) => {
        console.log(ress);
        this.dataService
          .getMarketPlaceByType(this.actualType.toLowerCase())
          .subscribe(
            (res: any) => {
              console.log(res);
              this.pages = [];
              for (var i = 1; i < res.total; i += 100) {
                this.pages.push(i + 1);
              }
              this.attachDataToList(res.marketplaceExchangeInfo, false);
            },
            (err) => {}
          );
      },
      (err) => {}
    );
  }

  changeType(type) {
    this.actualType = type;
    this.type = type;

    this.fetchMarketPlaceData();
    return false;
  }

  getArrayOfLength() {
    this.items = Array.from({ length: this.totalPages }, () =>
      Math.floor(Math.random() * 9)
    );
    return this.items;
  }

  goToPage(page) {
    if (!this.searchText) this.searchText = "";
    if (this.searchText !== "") {
      this.dataService
        .getMarketPlaceSearchData(this.searchText, this.actualType, page)
        .subscribe(
          (res: any) => {
            this.pages = [];
            for (var i = 1; i < res.total; i += 100) {
              this.pages.push(i + 1);
            }
            this.attachDataToList(res.marketplaceExchangeInfo, false);
          },
          (err) => {
            this.attachDataToList([], false);
          }
        );
    } else {
      this.dataService.getMarketPlaceByType(this.actualType, page).subscribe(
        (res: any) => {
          console.log(res);
          this.pages = [];
          for (var i = 1; i < res.total; i += 100) {
            this.pages.push(i + 1);
          }
          this.attachDataToList(res.marketplaceExchangeInfo, false);
        },
        (err) => {}
      );
    }
  }

  searchCoin(event) {
    const searchValue = event.target.value;
    if (!searchValue || searchValue === undefined) {
      this.changeType(this.type);
    }

    this.type = this.actualType;

    this.dataService
      .getMarketPlaceSearchData(this.searchText, this.actualType, 1)
      .subscribe(
        (res: any) => {
          this.pages = [];
          for (var i = 1; i < res.total; i += 100) {
            this.pages.push(i + 1);
          }
          this.attachDataToList(res.marketplaceExchangeInfo, false);
        },
        (err) => {
          this.attachDataToList([], false);
        }
      );
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
    //if(!decimals || isNaN(decimals)) decimals = 0;
    //return (num / Math.pow(10,decimals)).toPrecision(8);
  }
}
