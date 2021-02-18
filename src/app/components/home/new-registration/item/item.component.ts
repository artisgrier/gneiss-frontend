import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { DataService } from "src/app/service/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.css"],
})
export class ItemComponent implements OnInit {
  itemForm = {
    firstName: "",
    middleName: "",
    lastName: "",

    gender: "Male",
    citizenship: "USA",
    dob: "",

    name: "",
    details: "",
    legal: "",
  };
  @Output() open = new EventEmitter<{ content: string; msg: any }>();

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {}

  submitItem() {
    if (this.itemForm.firstName && this.itemForm.lastName) {
      this.dataService
        .createNewRegistration({
          ownerName:
            this.itemForm.firstName.charAt(0) + " " + this.itemForm.lastName,
          registryInfo: "Item",
          allInformation: this.itemForm,
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
      console.log(this.itemForm);
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
