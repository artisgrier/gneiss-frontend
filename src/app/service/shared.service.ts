import { Injectable } from "@angular/core";

export interface Pagination {
  perPage: number;
  page: number;
  pageData: any[];
  pageLength: number;
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  hasNext2?: boolean;
  hasPrev2?: boolean;
}

export const paginationData: Pagination = {
  perPage: 10,
  page: 1,
  pageData: [],
  pageLength: 0,
  currentPage: 1,
  hasNext: false,
  hasPrev: false,
  hasNext2: false,
  hasPrev2: false,
};

@Injectable({
  providedIn: "root",
})
export class SharedService {
  //every 30 seconds//
  private _pollingInterval = 1000 * 30;

  //every 15 minutes
  private _authTimeOut = 1000 * 60 * 60;

  get pollingInterval() {
    return this._pollingInterval;
  }

  get authTimeOut() {
    return this._authTimeOut;
  }

  insertDecimal(num, decimals, keepDecimals) {
    if (!decimals || isNaN(decimals)) decimals = 0;
    var number = num / Math.pow(10, decimals);
    if (num == 0) return 0;
    else {
      if (!keepDecimals) {
        if (number && !isNaN(number)) {
          if (number < 1000000000) {
            if (number.toString().split(".").length == 2) {
              return +number.toString().substring(0, 9).split(".")[0];
            } else {
              return +number.toString();
            }
          } else {
            return +Math.floor(number).toString();
          }
        } else {
          return 0;
        }
      } else {
        for (var i = 8; i < 20; i++) {
          if (+number.toFixed(i)) return +number.toFixed(i);
        }
        //console.log(number);
        return 0;
      }
    }
    //if(!decimals || isNaN(decimals)) decimals = 0;
    //return (num / Math.pow(10,decimals)).toPrecision(8);
  }

  get8DegitNumber(num) {
	  try {
	  	return +num.toFixed(8);
	  } catch(e) { 
	  	return "0";
	  }
  }
  get2DecimalNumber(num: number) {
    return num.toFixed(2);
  }



  roundNumber(n) {
    try {
      return +n.toFixed(12);
    } catch(e) {
      return 0;
    }
  }

  priceSum(arr, decimals) {
    var s = 0;
    if (arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].amt && arr[i].price) {
          s += +this.insertDecimal(arr[i].amt, decimals, true) * arr[i].price;
        }
      }
    }
    return s;
  }

  sumBuy(index, buyRequests, decimals) {
    var sum = 0;
    for (var i = 0; i <= index; i++) {
      sum +=
        buyRequests[i].price *
        +this.insertDecimal(buyRequests[i].amt, decimals, true);
    }
    return sum;
  }

  sumSell(index, sellRequests, decimals) {
    var sum = 0;
    console.log({index, sellRequests, decimals})
    for (var i = 0; i <= index; i++) {
      sum +=
        sellRequests[i].price *
        +this.insertDecimal(sellRequests[i].amt, decimals, true);
    }

    return sum;
  }

  amtSum(arr, decimals) {
    var s = 0;
    if (arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].amt) {
          s += +this.insertDecimal(arr[i].amt, decimals, true);
        }
      }
    }
    return s;
  }

  constructor() {}
}
