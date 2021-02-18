import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { DataService } from '../../service/data.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'src/app/service/loader.service';
import { StaticImageService } from 'src/app/service/static-image.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  data = [];
  image: Observable<Blob>;
  imageSrc: any;
  haveImg: boolean = false;

  constructor(
    public authService: AuthService,
    private loaderService: LoaderService,
    private httpClient: HttpClient,
    private dataService: DataService,
    private staticImage: StaticImageService) {
  }

  ngOnInit() {
    this.imageSrc = this.staticImage.getSplashImage();
    this.loaderService.showLoading = false;
    this.dataService.getMarketPlaceByType().subscribe((res: any) => {
      this.data = res.marketplaceExchangeInfo;
      this.image = this.getImage();
      this.image.subscribe(x => {
        this.createImageFromBlob(x);
      })
    });

    window['$Main']['welcome']();
  }

  getImage(): Observable<Blob> {
    return this.httpClient.get('../../../assets/images/gif/knight_01.gif', { responseType: "blob" });


  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageSrc = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

}
