import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { DataService } from "src/app/service/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-birth-certificate",
  templateUrl: "./birth-certificate.component.html",
  styleUrls: ["./birth-certificate.component.css"],
})
export class BirthCertificateComponent implements OnInit {
  @Output() open = new EventEmitter<{ content: string; msg: any }>();

  birthCertificateForm = {
    firstName: "",
    middleName: "",
    lastName: "",

    gender: "Male",
    citizenship: "USA",
    dob: "",
    time: "",

    place: "",
    address: "",
    city: "",
    country: "",

    mothersName: "",
    mothersDob: "",
    mothersBirthPlace: "",

    fathersName: "",
    fathersDob: "",
    fathersBirthPlace: "",

    homeAddress: "",
    attendants: "",
  };

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {}

  submitBirthCertificate() {
    if (
      this.birthCertificateForm.firstName &&
      this.birthCertificateForm.lastName
    ) {
      this.dataService
        .createNewRegistration({
          ownerName:
            this.birthCertificateForm.firstName.charAt(0) +
            " " +
            this.birthCertificateForm.lastName,
          registryInfo: "Birth Certificate",
          allInformation: this.birthCertificateForm,
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
      console.log(this.birthCertificateForm);
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
