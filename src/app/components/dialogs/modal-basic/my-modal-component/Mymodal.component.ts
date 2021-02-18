// mymodal.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-mymodal',
  templateUrl: './mymodal.component.html',
  styleUrls: ['./mymodal.component.css']
})
export class MymodalComponent implements OnInit {
 
  @Input() my_modal_title;
  @Input() my_modal_content;
 
  constructor(public activeModal: NgbActiveModal, config: NgbModalConfig) {
    config.backdrop = false;
  }
 
  ngOnInit() {
  }
 
}