import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  getAccessToken() {
        return localStorage.getItem('token');
  }

  getHeader() {
    const token =  this.getAccessToken();

    var header = {
      headers: new HttpHeaders()
        // .set('authToken',  token)
      }
    return header;
  }

  getWalletInfo() {
    return this.http.get(environment.v1 + 'walletInfo');
  }
  getMarketplacePriceInfo() {
	return this.http.get(environment.v1 + 'getMarketplacePriceInfo');
  }
  
  createNewCoin(data: Object) {
    return this.http.post(environment.v1 + 'newCoin',data);
  }

  createNewRegistration(data: Object) {
    return this.http.post(environment.v1 + 'newRegistration',data);
  }

  getUsers() {
    return this.http.get('https://reqres.in/api/users');
  }

  clearAllDetails(data:Object){
    return this.http.post('https://www.gneiss.io/cancelAllRequest',data);
  }

  deleteBuyerInfo(data:Object){
    return this.http.post('https://www.gneiss.io/cancelBuyRequest',data);
  }

  deleteSellerInfo(data:Object){
    return this.http.post('https://www.gneiss.io/cancelSellRequest',data);
  }

  getOpenBuysDetail(){
    return this.http.get('https://www.gneiss.io/openBuys');
  }

  getOpenSellDetail(){
    return this.http.get('https://www.gneiss.io/openSells');
  }

  getSettingsInfo () {
      return this.http.get(environment.v1 +'settingsInfo');
  }
  
  getExchangeInfo () {
      return this.http.get(environment.v1 +'exchangeInfo');
  }
  
  getCoinDetails (data: Object) {
      return this.http.post(environment.v1 +'getCoinDetails', data);
  }
  
  getBuySellRequests (data: Object) {
      return this.http.post(environment.v1 +'getBuySellRequests', data);
  }
  
  getMyBuySellRequests (data: Object) {
      return this.http.post(environment.v1 +'getMyBuySellRequests', data);
  }

  getMarketPlaceByType(type= 'btc', page=1,sort="volume",sortDirection=-1,searchText='') {
  	return this.http.get(environment.v1 +
  		'getMarketPlaceCoinList/'+type+'?page='+page+'&sort='+sort+
  		'&sortDirection='+sortDirection+'&searchText='+searchText);
  }

  getMarketPlaceSearchData(searchText,type ,page) {
    return this.http.get(environment.v1 + 'getMarketPlaceCoinList/'+type +
      "?page="+page+"&sort=volume&sortDirection=-1&searchText="+searchText);
  }
  /*Buy coin here*/
  buyCoin(data: Object) {
    return this.http.post(environment.v1 + 'buyCoin' , data);
  }
  
  sellCoin(data: Object) {
    return this.http.post(environment.v1 + 'sellCoin' , data);
  }
  /*Buy coin here*/
  getHistory(address: String, type:String) {
    return this.http.post(environment.v1 + 'getHistoryRequests', {address: address, type:type});
  }

  submitProfile(data: Object) {
    return this.http.post(environment.v1 + 'changeSettings' , data);
  }
  
  reorderCoins(data: Object) {
	return this.http.post(environment.v1 + 'setCoinOrder' , data);
  }
  
  withdrawBitcoin(data: Object) {
	return this.http.post(environment.v1 + 'withdrawBitcoin' , data);
  }
  
  withdrawEthereum(data: Object) {
	return this.http.post(environment.v1 + 'withdrawExchange' , data);
  }
  
  uploadCoinImages(data: Object) {
	return this.http.post(environment.v1 + 'uploadCoinImages' , data);
  }
  
  burnCoin(data: Object) {
	return this.http.post(environment.v1 + 'burnCoin' , data);
  }
  
  mintCoin(data: Object) {
	return this.http.post(environment.v1 + 'mintCoin' , data);
  }
  
  removeCoin(data: Object) {
	return this.http.post(environment.v1 + 'removeCoin' , data);
  }
  
  transferOwnershipOfCoin(data: Object) {
	return this.http.post(environment.v1 + 'transferOwnershipOfCoin' , data);
  }
  
  addPrivacyAddress(data: Object) {
	return this.http.post(environment.v1 + 'addPrivacyAddress' , data);
  }
  
  removePrivacyAddress(data: Object) {
	return this.http.post(environment.v1 + 'addPrivacyAddress' , data);
  }
  
  enableLN(data: Object) {
	return this.http.post(environment.v1 + 'enableLN' , data);
  }
  
  turnOffLN(data: Object) {
	return this.http.post(environment.v1 + 'turnOffLN' , data);
  }
  
  getLightningInvoiceInfo(data: Object) {
	return this.http.post(environment.v1 + 'getLightningInvoiceInfo' , data);
  }
  
  withdrawLightning(data: Object) {
	return this.http.post(environment.v1 + 'withdrawLightning' , data);
  }
  
  payLNInvoice(data: Object) {
	return this.http.post(environment.v1 + 'payLNInvoice' , data);
  }
  
  createLNInvoice(data: Object) {
	return this.http.post(environment.v1 + 'createLNInvoice' , data);
  }
  
  resetPassword(data: Object) {
	return this.http.post(environment.v1 + 'resetPassword' , data);
  }
  
  userHasPaidBASIS(data: Object) {
	return this.http.get(environment.v1 + 'userHasPaidBASIS' , data);
  }
  
  chargeUserBASIS(data: Object) {
	return this.http.post(environment.v1 + 'chargeUserBASIS' , data);
  }
  
  cancelSellRequest(data: Object) {
	return this.http.post(environment.v1 + 'cancelSellRequest' , data);
  }
  
  cancelBuyRequest(data: Object) {
	return this.http.post(environment.v1 + 'cancelBuyRequest' , data);
  }
  
  registrationInfo(data: Object) {
	return this.http.post(environment.v1 + 'registrationInfo' , data);
  }
  
  sendCoin(data: Object) {
	return this.http.post(environment.v1 + 'sendCoin' , data);
  }
  
  help(data: Object) {
	return this.http.post(environment.v1 + 'help' , data);
  }
  
  apiInfo() {
	return this.http.get(environment.v1 + 'apiInfo');
  }
  
  makeNewAPIKey(data: Object) {
	return this.http.post(environment.v1 + 'makeNewAPIKey' , data);
  }
  
  deleteAPIKey(data: Object) {
	return this.http.post(environment.v1 + 'deleteAPIKey' , data);
  }
}
