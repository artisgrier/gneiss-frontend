import { Component, OnInit, Input } from "@angular/core";
import { DataService } from 'src/app/service/data.service';
import { Pagination, paginationData } from "src/app/service/shared.service";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {TooltipPosition} from '@angular/material/tooltip';
import {FormControl} from '@angular/forms';

@Component({
  selector: "app-cryptoassets",
  templateUrl: "./cryptoassets.component.html",
  styleUrls: ["./cryptoassets.component.css"],
})
export class CryptoassetsComponent implements OnInit {
  @Input() coins: any[];
  @Input() gridOrList: boolean = true;
  pagination: Pagination = { ...paginationData, perPage: 20 };
  
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[2]);

  draggable = {
    data: "coin",
    effectAllowed: "move",
  };

  constructor(private dataService: DataService) {}

  ngOnInit() {
    if (this.coins.length > 0) {
      this.pageSet(0, this.pagination.perPage);
      this.pagination.pageLength = this.coins.length;
    }
  }

  pageSet(start: number, end: number) {
    this.pagination.pageData = this.coins.slice(start, end);
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.pagination.pageData, event.previousIndex, event.currentIndex);
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
