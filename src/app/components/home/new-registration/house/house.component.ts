import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { DataService } from "src/app/service/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-house",
  templateUrl: "./house.component.html",
  styleUrls: ["./house.component.css"],
})
export class HouseComponent implements OnInit {
  @Output() open = new EventEmitter<{ content: string; msg: any }>();

  houseForm = {
    firstName: "",
    middleName: "",
    lastName: "",

    gender: "Male",
    citizenship: "USA",
    dob: "",

    address: "",
    yearBuilt: "",
    other: "",
    details: "",
  };

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {}

  submitHouse() {
    if (this.houseForm.firstName && this.houseForm.lastName) {
      this.dataService
        .createNewRegistration({
          ownerName:
            this.houseForm.firstName.charAt(0) + " " + this.houseForm.lastName,
          registryInfo: "House",
          allInformation: this.houseForm,
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
      console.log(this.houseForm);
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
