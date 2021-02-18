import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {
  Component,
  NgZone,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { SharedService } from "src/app/service/shared.service";
import { DataService } from "../../../service/data.service";
import { MymodalComponent } from "../../dialogs/modal-basic/my-modal-component/Mymodal.component";
declare var $: any;

// used amchart license
am4core.options.minPolylineStep = 5;
am4core.useTheme(am4themes_animated);
am4core.addLicense("CH200425568979111");

@Component({
  selector: "app-trade",
  templateUrl: "./trade.component.html",
  styleUrls: ["./trade.component.css"],
})
export class TradeComponent implements OnInit {
  @ViewChild("mymodal", { static: false }) mymodal: TemplateRef<any>;
  modalOptions: { backdrop: string; backdropClass: string };

  price: number;
  abbr: "";
  hash: "";
  address: "";
  name: "";
  history = [];
  /*Buy Coin FormGroup*/
  buyCoinForm = this.fb.group({
    address: ["", Validators.required],
    value: ["", Validators.required],
    price: ["", Validators.required],
  });

  sellCoinForm = this.fb.group({
    address: ["", Validators.required],
    value: ["", Validators.required],
    price: ["", Validators.required],
  });
  coinDescription: "";
  coinPicture: "";
  isImageS3: "";
  isAllowed: boolean;
  isEditableCoin: boolean;
  s3_bucket: "";
  s3_end_point: "";
  own: number;
  decimals: number;
  buyRequests = [];
  sellRequests = [];
  myBuyRequests = [];
  mySellRequests = [];
  isOwner: boolean;
  canMintBurn: boolean;
  alreadyOwned: boolean;
  buyModel: any;
  sellModel: any;
  dateAxis: any;
  valueAxis: any;
  candlestickHistory: any;
  coinAmt: number;
  UFFS: boolean;
  sendForm = {
    coinToAddress: "",
    coinAmt: 0,
  };
  currentPrice = 0;

  buyCoinFormTotal = 0;
  sellCoinFormTotal = 0;
  btcInfo: any = null;
  exchangeInfo: any = null;
  href: string;
  lightningInfo: any = null;
  raidenInfo: any = null;

  private chart: am4charts.XYChart;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dataService: DataService,
    private modalService: NgbModal,
    private config: NgbModalConfig,
    private zone: NgZone,
    public sharedService: SharedService
  ) {
    config.centered = true;
    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
    };
  }
  actualType: string;
  type: string;

  getWalletInfo() {
    this.dataService.getWalletInfo().subscribe(
      (res: any) => {
        this.btcInfo = res.btcInfo;
        this.exchangeInfo = res.exchangeInfo;
        this.lightningInfo = res.lightningInfo;
        this.raidenInfo = res.raidenInfo;
      },
      (err) => {
        console.log(err);
        console.log("error");
      }
    );
  }

  onChangeByuCoinFormValues() {
    this.buyCoinForm.get("value").valueChanges.subscribe((rs) => {
      let val = this.buyCoinForm.get("price").value;
      this.buyCoinFormTotal = rs * val;
    });
    this.buyCoinForm.get("price").valueChanges.subscribe((rs) => {
      let val = this.buyCoinForm.get("value").value;
      this.buyCoinFormTotal = rs * val;
    });
  }

  onChangeSellCoinFormValues() {
    this.sellCoinForm.get("value").valueChanges.subscribe((rs) => {
      let val = this.sellCoinForm.get("price").value;
      this.sellCoinFormTotal = rs * val;
    });
    this.sellCoinForm.get("price").valueChanges.subscribe((rs) => {
      let val = this.sellCoinForm.get("value").value;
      this.sellCoinFormTotal = rs * val;
    });
  }

  loadData() {
    this.buyRequests = [];
    this.sellRequests = [];
    this.history = [];
    if (!this.actualType || !this.type) {
      if (localStorage["type"]) {
        this.actualType = localStorage["type"];
        this.type = localStorage["type"].toLowerCase();
      } else {
        localStorage["type"] = "BTC";
        this.actualType = "BTC";
        this.type = "btc";
      }
    }
    this.alreadyOwned = true;
    this.route.params.subscribe((params: Params) => {
      this.address = params.address;
      this.buyCoinForm.get("address").patchValue(params.address);
      this.sellCoinForm.get("address").patchValue(params.address);
      this.abbr = params.abbr;
      //this.price = params.price;
      //TODO:Price should equal last trade
      this.price = 0;
      this.hash = params.hash;
      this.name = params.name;
      this.dataService
        .getCoinDetails({ address: this.address })
        .subscribe((ress: any) => {
          this.href = ress[0].href;
          this.coinDescription = ress[0].coinDescription;
          this.coinPicture = ress[0].coinPicture;
          this.isImageS3 = ress[0].isImageS3;
          this.isAllowed = ress[0].isAllowed;
          this.UFFS = ress[0].UFFS;

          if (ress[0].isEditableCoin) {
            this.isEditableCoin = true;
          } else {
            this.isEditableCoin = false;
          }

          this.s3_bucket = ress[0].s3_bucket;
          this.s3_end_point = ress[0].s3_end_point;
          this.dataService
            .getMyBuySellRequests({
              address: this.address,
              hash: this.hash,
              type: this.type,
            })
            .subscribe((ressss: any) => {
              this.isOwner = ressss.isOwner;
              this.canMintBurn = ressss.canMintBurn;
              this.decimals = ressss.decimals;
              this.own = +ressss.own;
              this.alreadyOwned = ressss.alreadyOwned;
              this.myBuyRequests = ressss.buy;
              for (var i = 0; i < this.myBuyRequests.length; i++) {
                this.myBuyRequests[i].price = this.sharedService.roundNumber(
                  this.myBuyRequests[i].price * Math.pow(10, this.decimals)
                );
              }
              this.mySellRequests = ressss.sell;
              for (var i = 0; i < this.mySellRequests.length; i++) {
                this.mySellRequests[i].price = this.sharedService.roundNumber(
                  this.mySellRequests[i].price * Math.pow(10, this.decimals)
                );
              }
              this.dataService
                .getBuySellRequests({ address: this.address, type: this.type })
                .subscribe((resss: any) => {
                  //TODO: Buy Sell Requests
                  this.buyRequests = resss.buy;
                  this.sellRequests = resss.sell;
                  for (var i = 0; i < this.buyRequests.length; i++) {
                    this.buyRequests[i].price = this.sharedService.roundNumber(
                      this.buyRequests[i].price * Math.pow(10, this.decimals)
                    );
                  }
                  for (var i = 0; i < this.buyRequests.length; i++) {
                    for (var j = i + 1; j < this.buyRequests.length; j++) {
                      //console.log(this.buyRequests[i].price, this.buyRequests[j].price);
                      if (
                        this.buyRequests[i].price == this.buyRequests[j].price
                      ) {
                        this.buyRequests[i].amt += this.buyRequests[j].amt;
                        this.buyRequests.splice(j, 1);
                        j--;
                      }
                    }
                  }
                  for (var i = 0; i < this.sellRequests.length; i++) {
                    this.sellRequests[i].price = this.sharedService.roundNumber(
                      this.sellRequests[i].price * Math.pow(10, this.decimals)
                    );
                  }
                  for (var i = 0; i < this.sellRequests.length; i++) {
                    for (var j = i + 1; j < this.sellRequests.length; j++) {
                      if (
                        this.sellRequests[i].price == this.sellRequests[j].price
                      ) {
                        this.sellRequests[i].amt += this.sellRequests[j].amt;
                        this.sellRequests.splice(j, 1);
                        j--;
                      }
                    }
                  }
                  this.dataService
                    .getHistory(this.address, this.type)
                    .subscribe((res: any) => {
                      this.history = res;
                      if (this.history.length > 0) {
                        for (var i = this.history.length - 1; i >= 0; i--) {
                          this.history[i].date = new Date(this.history[i].date);
                        }
                        this.history.sort(function (a, b) {
                          return b.date - a.date;
                        });
                        this.candlestickHistory = [];
                        var lastOne = 0;
                        var currentInfo = {
                          date: -1,
                          open: 0,
                          high: 0,
                          low: 0,
                          close: 0,
                        };
                        for (var i = this.history.length - 1; i >= 0; i--) {
                          this.history[i].price =
                            this.history[i].price * Math.pow(10, this.decimals);
                          this.history[i].dateObj = new Date(
                            this.history[i].date
                          );
                          if (currentInfo.date == -1) {
                            currentInfo.date = this.history[i].date;
                            currentInfo.open = this.sharedService.roundNumber(
                              this.history[i].price
                            );
                            currentInfo.high = this.sharedService.roundNumber(
                              this.history[i].price
                            );
                            currentInfo.low = this.sharedService.roundNumber(
                              this.history[i].price
                            );
                            currentInfo.close = this.sharedService.roundNumber(
                              this.history[i].price
                            );
                          }

                          if (this.history[i].price > currentInfo.high) {
                            currentInfo.high = this.sharedService.roundNumber(
                              this.history[i].price
                            );
                          }

                          if (this.history[i].price < currentInfo.low) {
                            currentInfo.low = this.sharedService.roundNumber(
                              this.history[i].price
                            );
                          }

                          if (
                            new Date(currentInfo.date).getDate() !=
                            this.history[i].dateObj.getDate()
                          ) {
                            currentInfo.close = lastOne;
                            this.candlestickHistory.push(
                              JSON.parse(JSON.stringify(currentInfo))
                            );
                            currentInfo.date = this.history[i].date;
                            currentInfo.open = this.sharedService.roundNumber(
                              this.history[i].price
                            );
                            currentInfo.high = this.sharedService.roundNumber(
                              this.history[i].price
                            );
                            currentInfo.low = this.sharedService.roundNumber(
                              this.history[i].price
                            );
                            currentInfo.close = this.sharedService.roundNumber(
                              this.history[i].price
                            );
                          }

                          lastOne = this.sharedService.roundNumber(
                            this.history[i].price
                          );
                        }

                        currentInfo.close = lastOne;
                        this.candlestickHistory.push(
                          JSON.parse(JSON.stringify(currentInfo))
                        );

                        for (
                          var i = 0;
                          i < this.candlestickHistory.length;
                          i++
                        ) {
                          this.candlestickHistory[i].date = new Date(
                            this.candlestickHistory[i].date
                          );
                        }

                        this.candlestickHistory.sort(function (a, b) {
                          return a.date - b.date;
                        });

                        if (this.history && this.history.length > 0) {
                          this.currentPrice = this.history[0].price;
                        } else {
                          this.currentPrice = 0;
                        }

                        this.buyCoinForm
                          .get("price")
                          .patchValue(
                            this.sharedService
                              .get8DegitNumber(this.currentPrice)
                              .toString()
                          );
                        this.sellCoinForm
                          .get("price")
                          .patchValue(
                            this.sharedService
                              .get8DegitNumber(this.currentPrice)
                              .toString()
                          );

                        // add amchart4

                        this.zone.runOutsideAngular(() => {
                          let chart = am4core.create(
                            "chartdiv",
                            am4charts.XYChart
                          );

                          chart.paddingRight = 20;
                          
                          chart.events.on("ready", function () {
                            let date = new Date();
                            dateAxis.zoomToDates(
                              new Date(
                                date.getFullYear(),
                                date.getMonth(),
                                date.getDay()
                              ),
                              new Date(
                                date.getFullYear(),
                                date.getMonth()+1==13?1:date.getMonth()+1,
                                date.getDay()
                              )
                            );
                            document.getElementById("chartdiv").style.display =
                              "block";
                          });


                          let data = this.candlestickHistory.map((item) => {
                            return {
                              date: item.date,
                              open: item.open,
                              high: item.high,
                              low: item.low,
                              close: item.close,
                            };
                          });
                          chart.data = data;

                          chart.paddingRight = 20;

                          chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

                          let dateAxis = chart.xAxes.push(
                            new am4charts.DateAxis()
                          );
                          dateAxis.renderer.grid.template.location = 0;

                          let valueAxis = chart.yAxes.push(
                            new am4charts.ValueAxis()
                          );
                          valueAxis.tooltip.disabled = false;

                          let series = chart.series.push(
                            new am4charts.CandlestickSeries()
                          );
                          series.dataFields.dateX = "date";
                          series.dataFields.valueY = "close";
                          series.dataFields.openValueY = "open";
                          series.dataFields.lowValueY = "low";
                          series.dataFields.highValueY = "high";
                          series.simplifiedProcessing = true;
                          series.tooltipText =
                            "Open:{openValueY.value}\nLow:{lowValueY.value}\nHigh:{highValueY.value}\nClose:{valueY.value}";
                          dateAxis.renderer.cellStartLocation = 0.2;
                          dateAxis.renderer.cellEndLocation = 0.8;
                          series.columns.template.width = am4core.percent(100);
                          dateAxis.baseInterval = {
							  "timeUnit": "day",
							  "count": 1
						  }


                          chart.cursor = new am4charts.XYCursor();

                          // a separate series for scrollbar
                          let lineSeries = chart.series.push(
                            new am4charts.LineSeries()
                          );
                          lineSeries.dataFields.dateX = "date";
                          lineSeries.dataFields.valueY = "close";
                          // need to set on default state, as initially series is "show"
                          lineSeries.defaultState.properties.visible = false;

                          // hide from legend too (in case there is one)
                          lineSeries.hiddenInLegend = true;
                          lineSeries.fillOpacity = 0.5;
                          lineSeries.strokeOpacity = 0.5;

                          let scrollbarX = new am4charts.XYChartScrollbar();
                          scrollbarX.series.push(lineSeries);
                          chart.scrollbarX = scrollbarX;
                          this.chart = chart;
                          // chart.svgContainer.resizeSensor.reset();
                        });
                        // add amchart4

                        // // this.chart = AmCharts.makeChart("graphPanel", {
                        //     "type": "serial",
                        //     "theme": "light",
                        //     //"dataDateFormat":"YYYY-MM-DD",
                        //     "valueAxes": [{
                        //             "position": "left"
                        //         }],
                        //     "graphs": [{
                        //             "id": "g1",
                        //             "proCandlesticks": true,
                        //             "balloonText": "Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>",
                        //             "closeField": "close",
                        //             "fillColors": "#7f8da9",
                        //             "highField": "high",
                        //             "lineColor": "#7f8da9",
                        //             "lineAlpha": 1,
                        //             "lowField": "low",
                        //             "fillAlphas": 0.9,
                        //             "negativeFillColors": "#db4c3c",
                        //             "negativeLineColor": "#db4c3c",
                        //             "openField": "open",
                        //             "title": "Price:",
                        //             "type": "candlestick",
                        //             "valueField": "close"
                        //         }],
                        //     "chartScrollbar": {
                        //         "graph": "g1",
                        //         "graphType": "line",
                        //         "scrollbarHeight": 30
                        //     },
                        //     "chartCursor": {
                        //         "valueLineEnabled": true,
                        //         "valueLineBalloonEnabled": true
                        //     },
                        //     "categoryField": "date",
                        //     "categoryAxis": {
                        //         "parseDates": true
                        //     },
                        //     "dataProvider": this.candlestickHistory,
                        //     "export": {
                        //         "enabled": true,
                        //         "position": "bottom-right"
                        //     }
                        // });

                        // this.chart.addListener("rendered", this.zoomChart);
                        // this.zoomChart();
                        res
                          .slice(res.length - 10)
                          .slice(0)
                          .reverse()
                          .map((item) => {
                            //item.price = item.price.toFixed(12);
                            //item.price = this.sharedService. roundNumber(item.price * Math.pow(10,this.decimals))
                            this.history.push(item);
                          });
                        if (res.length > 0)
                          this.price = res[res.length - 1].price;
                      }
                    });
                });
            });
        });
    });
  }

  ngOnInit() {
    this.getWalletInfo();
    this.loadData();
    this.onChangeByuCoinFormValues();
    this.onChangeSellCoinFormValues();
  }

  open(content, msg) {
    const modalRef = this.modalService.open(MymodalComponent);
    modalRef.componentInstance.my_modal_title = msg.title;
    modalRef.componentInstance.my_modal_content = msg.content;
  }

  //   zoomChart() {
  // 	    // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
  // 	    this.chart.zoomToIndexes(this.chart.dataProvider.length - 50, this.chart.dataProvider.length - 1);
  // 	}

  /*Submit buy form here*/
  buyCoin() {
    if (this.buyCoinForm.status === "VALID") {
      const data = {
        address: this.buyCoinForm.get("address").value,
        amt: this.buyCoinForm.get("value").value * Math.pow(10, this.decimals),
        price: this.buyCoinForm.get("price").value,
        type: this.type,
      };
      this.dataService.buyCoin(data).subscribe(
        (res: any) => {
          if (res.success) {
            this.open(this.mymodal, { title: "Success", content: res.message });
            this.loadData();
          } else {
            this.open(this.mymodal, { title: "Error", content: res.message });
          }
        },
        (err: any) => {
          if (err.success) {
            this.open(this.mymodal, { title: "Success", content: err.message });
            this.loadData();
          } else {
            if (err.error && err.error.message)
              this.open(this.mymodal, {
                title: "Error",
                content: err.error.message,
              });
            else
              this.open(this.mymodal, { title: "Error", content: err.error });
          }
        }
      );
    }
  }

  sellCoin() {
    if (this.sellCoinForm.status === "VALID") {
      const data = {
        address: this.sellCoinForm.get("address").value,
        amt: this.sellCoinForm.get("value").value * Math.pow(10, this.decimals),
        price: this.sellCoinForm.get("price").value,
        type: this.type,
      };
      this.dataService.sellCoin(data).subscribe(
        (res: any) => {
          if (res.success) {
            this.open(this.mymodal, { title: "Success", content: res.message });
            this.loadData();
          } else {
            this.open(this.mymodal, { title: "Error", content: res.message });
          }
        },
        (err: any) => {
          if (err.success) {
            this.open(this.mymodal, { title: "Success", content: err.message });
            this.loadData();
          } else {
            if (err.error && err.error.message)
              this.open(this.mymodal, {
                title: "Error",
                content: err.error.message,
              });
            else
              this.open(this.mymodal, { title: "Error", content: err.error });
          }
        }
      );
    }
  }

  multiplyOneDecimals(a: any, b: any) {
    let val = +this.sharedService.insertDecimal(b, this.decimals, true);
    // val = val == 0 ? 1 : val;
    // const rs = a * val;
    return +a*val;
  }

  multiplyTwoDecimals(a, b) {
    return this.sharedService.insertDecimal(
      +this.sharedService.insertDecimal(a, this.decimals, true) *
        +this.sharedService.insertDecimal(b, this.decimals, true),
      0,
      true
    );
  }

  cancelSellRequest = function (id) {
    this.dataService.cancelSellRequest({ id: id }).subscribe(
      (res) => {
        this.open(this.mymodal, { title: "Success", content: res });
        this.loadData();
        //location.reload();
      },
      (err) => {
        if (err.status == 200) {
          this.open(this.mymodal, {
            title: "Success",
            content: "Sell Request Removed",
          });
          this.loadData();
        } else if (err.error && err.error.message) {
          this.open(this.mymodal, {
            title: "Error",
            content: err.error.message,
          });
        } else if (err.error) {
          this.open(this.mymodal, { title: "Error", content: err.error });
        } else {
          this.open(this.mymodal, {
            title: "Error",
            content: "An Error Has Occurred",
          });
        }
      }
    );
  };

  cancelBuyRequest = function (id) {
    this.dataService.cancelBuyRequest({ id: id }).subscribe(
      (res) => {
        this.open(this.mymodal, { title: "Success", content: res });
        this.loadData();
        //location.reload();
      },
      (err) => {
        if (err.status == 200) {
          this.open(this.mymodal, {
            title: "Success",
            content: "Buy Request Removed",
          });
          this.loadData();
        } else if (err.error && err.error.message) {
          this.open(this.mymodal, {
            title: "Error",
            content: err.error.message,
          });
        } else if (err.error) {
          this.open(this.mymodal, { title: "Error", content: err.error });
        } else {
          this.open(this.mymodal, {
            title: "Error",
            content: "An Error Has Occurred",
          });
        }
      }
    );
  };

  setBuyCoinPrice(newPrice, index) {
    this.buyCoinForm.controls["price"].setValue(newPrice);
    var sum = 0;
    for (var i = 0; i <= index; i++) {
      sum = this.sharedService.roundNumber(sum + this.sellRequests[i].amt);
    }
    this.buyCoinForm.controls["value"].setValue(
      +this.sharedService.insertDecimal(sum, this.decimals, true)
    );
  }

  setSellCoinPrice(newPrice, index) {
    this.sellCoinForm.controls["price"].setValue(newPrice);
    var sum = 0;
    for (var i = 0; i <= index; i++) {
      sum = this.sharedService.roundNumber(sum + this.buyRequests[i].amt);
    }
    this.sellCoinForm.controls["value"].setValue(
      +this.sharedService.insertDecimal(sum, this.decimals, true)
    );
  }

  sendCoin() {
    this.dataService
      .sendCoin({
        address: this.address,
        amt: this.sendForm.coinAmt * Math.pow(10, this.decimals),
        to: this.sendForm.coinToAddress,
      })
      .subscribe(
        (res) => {
          this.open(this.mymodal, { title: "Success", content: "Coin Sent" });
          location.reload();
        },
        (err) => {
          if (err.status == 200) {
            this.open(this.mymodal, { title: "Success", content: "Coin Sent" });
          } else if (err.error && err.error.message) {
            this.open(this.mymodal, {
              title: "Error",
              content: err.error.message,
            });
          } else if (err.error) {
            this.open(this.mymodal, { title: "Error", content: err.error });
          } else {
            this.open(this.mymodal, {
              title: "Error",
              content: "An Error Has Occurred",
            });
          }
        }
      );
  }

  startModal() {
    jQuery.noConflict();
    $("#coinoverlay").modal();
    //$(".modal-backdrop").hide();
  }

  getTimeString(dateString) {
    var d = new Date(dateString);
    var minutes = d.getMinutes().toString();
    var hours = d.getHours();
    if (+minutes < 10) {
      minutes = "0" + minutes;
    }
    return hours + ":" + minutes;
  }

  getDate(dateString) {
    var d = new Date(dateString);

    var month = d.getMonth() + 1;
    var date = d.getDate();
    var year = d.getFullYear();
    return month + "/" + date + "/" + year;
  }

  createCoin() {
    this.dataService
      .createNewCoin({ importAddress: this.address, nameType: "import" })
      .subscribe(
        (res: any) => {
          this.open(this.mymodal, {
            title: "Success",
            content: "Coin Imported To Wallet",
          });
          location.reload();
        },
        (err) => {
          if (err.status == 200) {
            this.open(this.mymodal, {
              title: "Success",
              content: "Coin Imported To Wallet",
            });
          } else if (err.error && err.error.message) {
            this.open(this.mymodal, {
              title: "Error",
              content: err.error.message,
            });
          } else if (err.error) {
            this.open(this.mymodal, { title: "Error", content: err.error });
          } else {
            this.open(this.mymodal, {
              title: "Error",
              content: "An Error Has Occurred",
            });
          }
        }
      );
  }

  changeType(type) {
    localStorage["type"] = type;
    this.actualType = type;
    this.type = type.toLowerCase();

    this.loadData();
    return false;
  }
}
