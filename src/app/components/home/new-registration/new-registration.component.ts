import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { MymodalComponent } from "../../dialogs/modal-basic/my-modal-component/Mymodal.component";
import { Feilds, RegistrationTypesList } from "./registration.data";

enum FormTypes {
  BirthCertificate,
  MarriageRegistration,
  DeathCertificate,
  WillTestimonial,
  Business,
  House,
  Automobile,
  Item,
  RealEstate,
  WaterborneVessel,
  AeronauticalVehicle,
  Spacecraft,
}

@Component({
  selector: "app-new-registration",
  templateUrl: "./new-registration.component.html",
  styleUrls: ["./new-registration.component.css"],
})
export class NewRegistrationComponent implements OnInit {
  @ViewChild("mymodal", { static: false }) mymodal: TemplateRef<any>;
  modalOptions: { backdrop: string; backdropClass: string };

  formTypes = FormTypes;
  registrationTypeList = RegistrationTypesList;
  regChildList = [];

  fields = Feilds; // coinTemplate
  public show: boolean = false;
  registrationType: any;

  constructor(
    public router: Router,
    private modalService: NgbModal,
    private config: NgbModalConfig
  ) {
    config.centered = true;
    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
    };
  }

  ngOnInit() {
    this.registrationType = { type: FormTypes.BirthCertificate };
  }

  open(content, msg) {
    const modalRef = this.modalService.open(MymodalComponent, {
      backdrop: true,
    });
    modalRef.componentInstance.my_modal_title = msg.title;
    modalRef.componentInstance.my_modal_content = msg.content;
  }

  toggle() {
    this.show = !this.show;
  }

  onChangeRegistrationType(val: Event) {
    const type = (val.target as HTMLInputElement).value;
    console.log(type);
    if (!type || type == "") {
      this.regChildList = [];
      return;
    }

    this.registrationTypeList.forEach((val, i) => {
      if (val.name == type) {
        this.regChildList = val.child;

        if (type == "Business") {
          this.registrationType = { type: FormTypes.Business };
        } else if (type == "House") {
          this.registrationType = { type: FormTypes.House };
        } else if (type == "Automobile") {
          this.registrationType = { type: FormTypes.Automobile };
        } else if (type == "Item") {
          this.registrationType = { type: FormTypes.Item };
        } else if (type == "Real Estate") {
          this.registrationType = { type: FormTypes.RealEstate };
        } else if (type == "Waterborne Vessel") {
          this.registrationType = { type: FormTypes.WaterborneVessel };
        } else if (type == "Aeronautical Vehicle") {
          this.registrationType = { type: FormTypes.AeronauticalVehicle };
        } else if (type == "Spacecraft") {
          this.registrationType = { type: FormTypes.Spacecraft };
        }
      }
    });
  }

  onRegChildChange(e: Event) {}

  validateForm() {}
}
