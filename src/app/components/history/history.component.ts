import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-wallet',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private fb: FormBuilder, private dataService: DataService) { }

  btcAddress = ""; 
  exchangeAddress = ""; 
  btcInfo:any={};
  exchangeInfo:any={};
  lightningInfo = {enabled:false};
  LNInvoice = "";
  LNAmount = "";
  lightningAddress="";
  LNInvoiceInfo = "";
  newLNInvoice = "";
  exchangeDesc = [];
  btcDesc = [];
  years = [];
  
  monthStrings = [
        "January",
        "Febuary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    dayStrings = [
        "0",
        "1st",
        "2nd",
        "3rd",
        "4th",
        "5th",
        "6th",
        "7th",
        "8th",
        "9th",
        "10th",
        "11th",
        "12th",
        "13th",
        "14th",
        "15th",
        "16th",
        "17th",
        "18th",
        "19th",
        "20th",
        "21st",
        "22nd",
        "23rd",
        "24th",
        "25th",
        "26th",
        "27th",
        "28th",
        "29th",
        "30th",
        "31st"
    ]
    
    insertDecimal(num, decimals, keepDecimals) {
		if(!decimals || isNaN(decimals)) decimals = 0;
		var number = num / Math.pow(10,decimals);
		if(!keepDecimals) {
			if(number && !isNaN(number)) {
				if(number < 1000000000) {
					if(number.toString().split(".").length==2) {
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
  
  sendBtcForm =  this.fb.group({
  	  amt: 0,
  	  to: ""
  });  
  
  sendEthForm =  this.fb.group({
  	  amt: 0,
  	  to: ""
  });  
  
  showInvoice = false;
    
	setShowInvoice(b) {
	    this.showInvoice = b;
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
  
  getWalletInfo() {
	  this.dataService.getWalletInfo().subscribe((res: any)=>{
  			this.btcAddress = res.btcAddress;
            this.exchangeAddress = res.exchangeAddress;
            this.btcInfo = res.btcInfo;
            this.exchangeInfo = res.exchangeInfo;
            this.lightningInfo = res.lightningInfo;
            this.lightningAddress = res.lightningAddress;
            this.exchangeDesc = [];
            
            for(var i=0;i<res.exchangeHistoryResult.length;i++) {
	            if (res.exchangeHistoryResult[i].hash.indexOf("0x") == 0) {
                    res.exchangeHistoryResult[i].hash = res.exchangeHistoryResult[i].hash.substr(2)
                }
                res.exchangeHistoryResult[i].type = 9001;
	            this.exchangeInfo.txrefs.push({tx_hash: res.exchangeHistoryResult[i].hash, confirmed: new Date(res.exchangeHistoryResult[i].date).getTime(), value: 0})
            }
            
            res.exchangeDesc = res.exchangeDesc.concat(res.exchangeHistoryResult);

            for (var i = 0; i < res.exchangeDesc.length; i++) {
                if (res.exchangeDesc[i].hash.indexOf("0x") == 0) {
                    res.exchangeDesc[i].hash = res.exchangeDesc[i].hash.substr(2)
                }
                if(!res.exchangeDesc[i].decimals) res.exchangeDesc[i].decimals=0;
                if(res.exchangeDesc[i].amt && !isNaN(res.exchangeDesc[i].amt)) res.exchangeDesc[i].amt = this.insertDecimal(res.exchangeDesc[i].amt, res.exchangeDesc[i].decimals, false);
                this.exchangeDesc[res.exchangeDesc[i].hash] = res.exchangeDesc[i];
            }

            this.btcDesc = [];
            for (var i = 0; i < res.btcDesc.length; i++) {
                this.btcDesc[res.btcDesc[i].hash] = res.btcDesc[i];
            }
            
            if (this.exchangeInfo.txrefs) {
                for (var i = 0; i < this.exchangeInfo.txrefs.length; i++) {
                    var year = new Date(this.exchangeInfo.txrefs[i].confirmed).getFullYear();
                    var month = new Date(this.exchangeInfo.txrefs[i].confirmed).getMonth();
                    var day = new Date(this.exchangeInfo.txrefs[i].confirmed).getDate();
                    var a = -1;
                    var b = -1;
                    var c = -1;
                    for (var j = 0; j < this.years.length; j++) {
                        if (this.years[j].year == year) {
                            a = j;
                            for (var k = 0; k < this.years[j].months.length; k++) {
                                if (this.years[j].months[k].month == this.monthStrings[month]) {
                                    b = k;
                                    for (var l = 0; l < this.years[j].months[k].days.length; l++) {
                                        if (this.years[j].months[k].days[l].day == day) {
                                            c = l;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    var newTx = {
                        hash: this.exchangeInfo.txrefs[i].tx_hash,
                        btcOrEth: "eth",
                        time: this.getTimeString(this.exchangeInfo.txrefs[i].confirmed),
                        date: new Date(this.exchangeInfo.txrefs[i].confirmed),
                        desc: this.exchangeInfo.txrefs[i]
                    }
    
                    if (a == -1) {
                        this.years.push({
                            year: year,
                            months: [{
                                    month: this.monthStrings[month],
                                    number: month,
                                    days: [{
                                            day: day,
                                            hashes: [newTx]
                                        }]
                                }]
                        })
                    } else if (b == -1) {
                        this.years[a].months.push({
                            month: this.monthStrings[month],
                            number: month,
                            days: [{
                                    day: day,
                                    hashes: [newTx]
                                }]
                        })
                    } else if (c == -1) {
                        this.years[a].months[b].days.push({
                            day: day,
                            hashes: [newTx]
                        })
                    } else {
                        this.years[a].months[b].days[c].hashes.push(newTx)
                    }
                }
            }else {
                this.exchangeInfo.txrefs = [];
            }
            
            for (var i = 0; i < this.btcInfo.txs.length; i++) {
                if (this.btcInfo.txs[i].time) {
                    this.btcInfo.txs[i].time *= 1000;
                    this.btcInfo.txs[i].amount = 0;
                    for (var j = 0; j < this.btcInfo.txs[i].inputs.length; j++) {
                        if (this.btcInfo.txs[i].inputs[j].address == this.btcAddress) {
                            this.btcInfo.txs[i].amount += this.btcInfo.txs[i].inputs[j].value;
                        }
                    }
                    for (var j = 0; j < this.btcInfo.txs[i].outputs.length; j++) {
                        if (this.btcInfo.txs[i].outputs[j].address == this.btcAddress) {
                            this.btcInfo.txs[i].amount -= this.btcInfo.txs[i].outputs[j].value;
                        }
                    }
                    this.btcInfo.txs[i].amount *= -1;
                    var year = new Date(this.btcInfo.txs[i].time).getFullYear();
                    var month = new Date(this.btcInfo.txs[i].time).getMonth();
                    var day = new Date(this.btcInfo.txs[i].time).getDate();
                    var a = -1;
                    var b = -1;
                    var c = -1;
                    for (var j = 0; j < this.years.length; j++) {
                        if (this.years[j].year == year) {
                            a = j;
                            for (var k = 0; k < this.years[j].months.length; k++) {
                                if (this.years[j].months[k].month == this.monthStrings[month]) {
                                    b = k;
                                    for (var l = 0; l < this.years[j].months[k].days.length; l++) {
                                        if (this.years[j].months[k].days[l].day == day) {
                                            c = l;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    var newTx = {
                        hash: this.btcInfo.txs[i].hash,
                        btcOrEth: "btc",
                        time: this.getTimeString(this.btcInfo.txs[i].time),
                        date: new Date(this.btcInfo.txs[i].time),
                        desc: this.btcInfo.txs[i]
                    }

                    if (a == -1) {
                        this.years.push({
                            year: year,
                            months: [{
                                    month: this.monthStrings[month],
                                    number: month,
                                    days: [{
                                            day: day,
                                            hashes: [newTx]
                                        }]
                                }]
                        })
                    } else if (b == -1) {
                        this.years[a].months.push({
                            month: this.monthStrings[month],
                            number: month,
                            days: [{
                                    day: day,
                                    hashes: [newTx]
                                }]
                        })
                    } else if (c == -1) {
                        this.years[a].months[b].days.push({
                            day: day,
                            hashes: [newTx]
                        })
                    } else {
                        this.years[a].months[b].days[c].hashes.push(newTx)
                    }
                }
            }
		},(err) => {
        	console.log(err); 
  			console.log("error");
		}); 
  }
  
  ngOnInit() {
  	this.getWalletInfo();
  }
  
  roundNumber(n) {
        if (n) {
            return +(n.toFixed(12))
        } else {
            return 0;
        }
    }
    
    makeETHString = function (hash) {
        if (this.exchangeDesc[hash.desc.tx_hash]) {
            var ethString = ""
            if (this.exchangeDesc[hash.desc.tx_hash].type == 0) {
                ethString += "New Coin ";
                if (this.exchangeDesc[hash.desc.tx_hash].amt && this.exchangeDesc[hash.desc.tx_hash].abbr) {
                    ethString += this.exchangeDesc[hash.desc.tx_hash].amt + " " + this.exchangeDesc[hash.desc.tx_hash].abbr;
                }
                ethString += " Fee";
            } else if (this.exchangeDesc[hash.desc.tx_hash].type == 1) {
                ethString += "Send " + this.exchangeDesc[hash.desc.tx_hash].amt + " " + this.exchangeDesc[hash.desc.tx_hash].abbr + " Fee"
            } else if (this.exchangeDesc[hash.desc.tx_hash].type == 9001) {
                ethString += "Recieved " + this.exchangeDesc[hash.desc.tx_hash].amt + " " + this.exchangeDesc[hash.desc.tx_hash].abbr
            } else {
                ethString += this.exchangeDescriptors[this.exchangeDesc[hash.desc.tx_hash].type]
            }
            return ethString;
        } else {
            if (hash.desc.tx_input_n == -1) {
                return "Received"
            } else {
                return "Transferred"
            }
        }
    }
    
    exchangeDescriptors = [
        "New Coin Fee",
        "Send Coin Fee",
        "Sell Coin Fee",
        "Buy Coin Fee",
        "Mint Coin Fee",
        "Burn Coin Fee",
        "Tax",
        "Add Privacy Address",
        "Remove Privacy Address",
        "Transfer Ownership",
        "Registration Creation Fee"
    ]

    btcDescriptors = [
        "Buy Coin Fee",
        "Buy Coin Fee",
    ]

    makeBTCString = function (tx) {
        if (this.btcDesc[tx.hash]) {
            var btcString = "";
            if (tx.size > 0) {
                btcString += "Sell ";
            } else {
                btcString += "Buy ";
            }

            if (this.btcDesc[tx.hash].amt) {
                btcString += this.btcDesc[tx.hash].amt + " ";
            }

            if (this.btcDesc[tx.hash].abbr) {
                btcString += this.btcDesc[tx.hash].abbr + " ";
            } else {
                btcString += "Coin ";
            }

            if (this.btcDesc[tx.hash].price) {
                btcString += "@" + this.btcDesc[tx.hash].price + " BTC ";
            }

            return btcString;
        } else if (tx.amount > 0) {
            return "Recieved";
        } else {
            return "Transferred";
        }
    }
    
    export() {
        var finalCSV = "Date, Amount, Type, Description, Time, Hash\n"
        for (var i = this.years.length - 1; i >= 0; i--) {
            for (var j = this.years[i].months.length - 1; j >= 0; j--) {
                for (var k = this.years[i].months[j].days.length - 1; k >= 0; k--) {
                    for (var l = this.years[i].months[j].days[k].hashes.length - 1; l >= 0; l--) {
                        finalCSV += '"' + this.years[i].months[j].month + " " + this.years[i].months[j].days[k].day + ", " + this.years[i].year + '"';
                        finalCSV += ",";
                        finalCSV += this.years[i].months[j].days[k].hashes[l].btcOrEth == 'btc' ? this.years[i].months[j].days[k].hashes[l].desc.amount : this.years[i].months[j].days[k].hashes[l].desc.value / 1000000000000000000;
                        finalCSV += ",";
                        finalCSV += this.years[i].months[j].days[k].hashes[l].btcOrEth == 'btc' ? "BTC" : "ETH";
                        finalCSV += ",";
                        finalCSV += this.years[i].months[j].days[k].hashes[l].btcOrEth == 'btc' ? this.makeBTCString(this.years[i].months[j].days[k].hashes[l].desc) : this.makeETHString(this.years[i].months[j].days[k].hashes[l]);
                        finalCSV += ",";
                        finalCSV += this.years[i].months[j].days[k].hashes[l].time;
                        finalCSV += ","
                        finalCSV += this.years[i].months[j].days[k].hashes[l].hash;
                        finalCSV += "\n"

                    }
                }
            }
        }
        (<HTMLLinkElement>document.getElementById("dl")).href = "data:text/plain," + encodeURIComponent(finalCSV);
        document.getElementById("dl").click();
    }

}
