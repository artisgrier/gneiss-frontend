import { Component, OnInit, Input } from "@angular/core";
import { Pagination, paginationData } from "src/app/service/shared.service";
import {TooltipPosition} from '@angular/material/tooltip';
import {FormControl} from '@angular/forms';
@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"],
})
export class RegistrationComponent implements OnInit {
  @Input() registrationGridOrList: boolean = true;
  @Input() registrations: any[];
  pagination: Pagination = { ...paginationData, perPage: 20 };
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[2]);
  constructor() {}

  ngOnInit() {
    this.pageSet(0, this.pagination.perPage);
    this.pagination.pageLength = this.registrations.length;
  }

  pageSet(start: number, end: number) {
    this.pagination.pageData = this.registrations.slice(start, end);
  }
}
