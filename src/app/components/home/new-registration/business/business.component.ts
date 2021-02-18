import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { DataService } from "src/app/service/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-business",
  templateUrl: "./business.component.html",
  styleUrls: ["./business.component.css"],
})
export class BusinessComponent implements OnInit {
  businessForm = {
    name: "",
    address: "",
    date: "",
    country: "",
    type: "",
    owners: "",
    reps: "",
    details: "",
    capital: "",
    shortName: "",
  };

  @Output() open = new EventEmitter<{ content: string; msg: any }>();

  constructor(private dataService: DataService, public router: Router) {}
  ngOnInit() {}

  submitBusiness() {
    if (this.businessForm.shortName) {
      this.dataService
        .createNewRegistration({
          ownerName: this.businessForm.shortName,
          registryInfo: "Business",
          allInformation: this.businessForm,
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
      console.log(this.businessForm);
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
