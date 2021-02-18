import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { DataService } from "src/app/service/data.service";

@Component({
  selector: "app-spacecraft",
  templateUrl: "./spacecraft.component.html",
  styleUrls: ["./spacecraft.component.css"],
})
export class SpacecraftComponent implements OnInit {

  spaceshipForm = {
    firstName: "",
    middleName: "",
    lastName: "",

    gender: "Male",
    citizenship: "USA",
    dob: "",
    time: "",

    maker: "",
    model: "",
    year: "",
    licenseNumber: "",
    inspection: "",
    vid: "",
    title: "",
    classification: "",
    other: "",
  };

  @Output() open = new EventEmitter<{ content: string; msg: any }>();

  constructor(private dataService: DataService, public router: Router) {}
  ngOnInit() {}

  submitSpaceship() {
    if (this.spaceshipForm.firstName && this.spaceshipForm.lastName) {
      this.dataService
        .createNewRegistration({
          ownerName:
            this.spaceshipForm.firstName.charAt(0) +
            " " +
            this.spaceshipForm.lastName,
          registryInfo: "Spaceship",
          allInformation: this.spaceshipForm,
        })
        .subscribe(
          (res: any) => {
            this.open.next({
              content: null,
              msg: { title: "Success", content: res.message },
            });
            return this.router.navigate(["/home/client-home"]);
          },
          (err) => {
            this.open.next({
              content: null,
              msg: {
                title: "Error",
                content: err.error.message,
              },
            });
          }
        );
    } else {
      console.log(this.spaceshipForm);
      this.open.next({
        content: null,
        msg: {
          title: "Information",
          content: "Please fill out all fields",
        },
      });
    }
  }
}
