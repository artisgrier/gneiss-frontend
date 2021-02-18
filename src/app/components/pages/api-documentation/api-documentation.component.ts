import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-api-documentation',
  templateUrl: './api-documentation.component.html',
  styleUrls: ['./api-documentation.component.css']
})
export class ApiDocumentationComponent implements OnInit {

  constructor() { }

  public exchangeInfo = {
    btcInfo: { balance: 0, btcInExchange: 0 }, exchangeAddress: "0x...",
    exchangeInfo: { balance: 0 }, exchangeName: "My Exchange", tokens: ['...'], totalValueOfExchange: 0,
    totalValueOfExchangeETH: 0
  }

  public buySellRequest = "{[buy: [...], sell: [...], isOwner: true, canMintBurn: true]}";
  public postDeleteKey = {"key": "API Key to Delete"};

ngOnInit() {
}

}
