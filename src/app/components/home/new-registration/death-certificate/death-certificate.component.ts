import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { DataService } from "src/app/service/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-death-certificate",
  templateUrl: "./death-certificate.component.html",
  styleUrls: ["./death-certificate.component.css"],
})
export class DeathCertificateComponent implements OnInit {
  deathCertificateForm = {
    firstName: "",
    middleName: "",
    lastName: "",

    gender: "Male",
    citizenship: "USA",
    dod: "",
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
    cause: "",
  };

  @Output() open = new EventEmitter<{ content: string; msg: any }>();

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {}

  submitDeathCertificate() {
    if (
      this.deathCertificateForm.firstName &&
      this.deathCertificateForm.lastName
    ) {
      this.dataService
        .createNewRegistration({
          ownerName:
            this.deathCertificateForm.firstName.charAt(0) +
            " " +
            this.deathCertificateForm.lastName,
          registryInfo: "Death Certificate",
          allInformation: this.deathCertificateForm,
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
      console.log(this.deathCertificateForm);
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
