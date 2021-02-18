import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable()
export class LoaderService {
    private _showLoading: boolean = true;
    public get showLoading() {
        return this._showLoading;
    }
    public set showLoading(value) {
        this._showLoading = value;
    }

    isLoading = new Subject<boolean>();
    show() {
        console.log("show")
        this.isLoading.next(true);
    }
    hide() {
        console.log("hide")
        this.isLoading.next(false);
    }
}