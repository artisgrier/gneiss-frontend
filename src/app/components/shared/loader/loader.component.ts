import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../../../service/loader.service';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  sub: Subject<boolean> = this.loaderService.isLoading;
  isLoading = false;
  constructor(private loaderService: LoaderService){
	  this.sub.subscribe({
	  next: (v) => this.isLoading=v
	});
  }
}