import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { DataService } from "src/app/service/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-automobile",
  templateUrl: "./automobile.component.html",
  styleUrls: ["./automobile.component.css"],
})
export class AutomobileComponent implements OnInit {
  carForm = {
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

  submitCar() {
    if (this.carForm.firstName && this.carForm.lastName) {
      this.dataService
        .createNewRegistration({
          ownerName:
            this.carForm.firstName.charAt(0) + " " + this.carForm.lastName,
          registryInfo: "Car",
          allInformation: this.carForm,
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
      console.log(this.carForm);
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
