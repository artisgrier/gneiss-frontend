import { Injectable, ViewChild, TemplateRef, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MymodalComponent } from '../components/dialogs/modal-basic/my-modal-component/Mymodal.component';
import { EventService } from './event.service';
import { SharedService } from './shared.service';

@Injectable({
    providedIn: 'root'
})

export class AuthService implements OnDestroy {
    ngOnDestroy(): void {
        if (this.subscribeAuth)
            this.subscribeAuth.unsubscribe();
    }

    subscribeAuth: any;


    @ViewChild("mymodal", { static: false }) mymodal: TemplateRef<any>;
    modalOptions: { backdrop: string; backdropClass: string; };

    // Store authentication data
    expiresAt: number;
    userProfile: any;
    accessToken: string;
    authenticated: boolean;
    userLoggedIn = false;
    loginMessage = new Subject();

    constructor(private http: HttpClient, public router: Router, private modalService: NgbModal,
        private eventService: EventService, private sharedService:SharedService) {
        this.modalOptions = {
            backdrop: 'static',
            backdropClass: 'customBackdrop'
        }
    }

    open(content, msg) {
        const modalRef = this.modalService.open(MymodalComponent);
        modalRef.componentInstance.my_modal_title = msg.title;
        modalRef.componentInstance.my_modal_content = msg.content;
    }

    /*Auth Register*/
    registerUser(register: Object) {
        return this.http.post(environment.v1 + 'signUp', register);
    }

    subscribeToAuthCheck(){
        this.subscribeAuth = this.eventService.announceCheckAuth$.subscribe(() => {
           if (this.userAuthorization() === false){
            //return this.router.navigate(['/auth/login']);
           }
        });
    }

    getAccessToken() {
        return localStorage.getItem('token');
    }

    getUserInfo(authResult) {
    }

    private _setSession(authResult, profile) {
        // Save authentication data and update login status subject
        this.expiresAt = authResult.expiresIn * 1000 + Date.now();
        this.accessToken = authResult.accessToken;
        this.userProfile = profile;
        this.authenticated = true;
    }

    // logout() {
    // 	// Log out of Auth0 session
    // 	// Ensure that returnTo URL is specified in Auth0
    // 	// Application settings for Allowed Logout URLs
    // 	this.authenticated = false;
    // 	this.expiresAt = Date.now();
    //        this.getLogOut();
    //        return this.router.navigate(['']);
    // }

    get isLoggedIn(): boolean {
        // Check if current date is before token
        // expiration and user is signed in locally
        console.log('sec info', Date.now(), this.expiresAt, this.authenticated);
        return Date.now() < this.expiresAt && this.authenticated;
    }


    /*Submit Login Form*/
    saveLogin(login: any) {

        this.http.post(environment.v1 + 'signin', login).subscribe((res: any) => {
            this.loginMessage.next(res);
            if (res.success === true) {
                if (res.authToken) {
                    console.log(this.sharedService.authTimeOut);
                    const expires = new Date(res.date + this.sharedService.authTimeOut);
                    console.log(expires);
                    this.saveDataToStorage(res.authToken, expires);
                    // this.expireTime(expires.getTime());
                    this.userLoggedIn = true;


                    return this.router.navigate(['/home/client-home']);
                }
            }
            else {

            }
        }, (err: any) => {
            this.open(this.mymodal, { title: "Error", content: err.error.message });;
        });
    }

    /*Login Message Send Here*/
    loginMessageSend() {
        return this.loginMessage.asObservable();
    }

    /*Check User is Login or Logout every time*/
    userAuthorization() {
        const userInfo = this.getUserData();
        if (userInfo) {
            const now = new Date();
            const expiry = new Date(userInfo.expiresIn);
            const futureTime = expiry.getTime() - now.getTime();
            if (futureTime > 0) {
                this.userLoggedIn = true;
                return this.userLoggedIn;
            }
        }

        this.userLoggedIn = false;
        this.getLogOut();
        return this.userLoggedIn;
    }

    /*Check user is login or logout*/
    getUserData() {
        const token = localStorage.getItem('token');
        const expiresIn = localStorage.getItem('expiresIn');
        if (token || expiresIn) {
            return { token, expiresIn };
        }
        return;
    }

    getLogOut() {
        this.clearDataFromLocalStorage();
    }

    /*Timer when expires time complete*/
    private expireTime(expires: number) {
        // setTimeout(() => {
        this.getLogOut();
        // }, expires * 1000);
    }

    /*Save data to local saveDataToStorageStorage*/
    private saveDataToStorage(token: string, expiresIn: Date) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiresIn', expiresIn.toISOString());
    }


    /*Clear Data from local Storage*/
    private clearDataFromLocalStorage() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiresIn');
    }

}
