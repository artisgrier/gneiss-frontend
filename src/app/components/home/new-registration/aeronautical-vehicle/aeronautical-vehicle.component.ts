import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { DataService } from "src/app/service/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-aeronautical-vehicle",
  templateUrl: "./aeronautical-vehicle.component.html",
  styleUrls: ["./aeronautical-vehicle.component.css"],
})
export class AeronauticalVehicleComponent implements OnInit {
  planeForm = {
    firstName: "",
    middleName: "",
    lastName: "",

    gender: "Male",
    citizenship: "USA",
    dob: "",

    maker: "",
    model: "",
    year: "",
    license: "",
    inspection: "",
    vid: "",
    title: "",
    classification: "",
    other: "",
  };

  @Output() open = new EventEmitter<{ content: string; msg: any }>();

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {}

  submitPlane() {
    if (this.planeForm.firstName && this.planeForm.lastName) {
      this.dataService
        .createNewRegistration({
          ownerName:
            this.planeForm.firstName.charAt(0) + " " + this.planeForm.lastName,
          registryInfo: "Plane",
          allInformation: this.planeForm,
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
      console.log(this.planeForm);
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
