import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { DataService } from "src/app/service/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-waterborne-vessel",
  templateUrl: "./waterborne-vessel.component.html",
  styleUrls: ["./waterborne-vessel.component.css"],
})
export class WaterborneVesselComponent implements OnInit {
  boatForm = {
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

  submitBoat() {
    if (this.boatForm.firstName && this.boatForm.lastName) {
      this.dataService
        .createNewRegistration({
          ownerName:
            this.boatForm.firstName.charAt(0) + " " + this.boatForm.lastName,
          registryInfo: "Boat",
          allInformation: this.boatForm,
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
      console.log(this.boatForm);
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
