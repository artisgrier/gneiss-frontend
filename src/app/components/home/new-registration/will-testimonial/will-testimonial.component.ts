import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { DataService } from "src/app/service/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-will-testimonial",
  templateUrl: "./will-testimonial.component.html",
  styleUrls: ["./will-testimonial.component.css"],
})
export class WillTestimonialComponent implements OnInit {
  @Output() open = new EventEmitter<{ content: string; msg: any }>();

  testimonyForm = {
    firstName: "",
    middleName: "",
    lastName: "",

    gender: "Male",
    citizenship: "USA",
    dob: "",

    address: "",
    will: "",
    beneficiaries: "",
  };

  constructor(private dataService: DataService, public router: Router) {}
  ngOnInit() {}

  submitTestimony() {
    if (this.testimonyForm.firstName && this.testimonyForm.lastName) {
      this.dataService
        .createNewRegistration({
          ownerName:
            this.testimonyForm.firstName.charAt(0) +
            " " +
            this.testimonyForm.lastName,
          registryInfo: "Testimony",
          allInformation: this.testimonyForm,
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
      console.log(this.testimonyForm);
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
