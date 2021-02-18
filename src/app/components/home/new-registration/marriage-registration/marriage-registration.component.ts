import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { DataService } from "src/app/service/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-marriage-registration",
  templateUrl: "./marriage-registration.component.html",
  styleUrls: ["./marriage-registration.component.css"],
})
export class MarriageRegistrationComponent implements OnInit {

  marriageForm = {
    mFirstName: "",
    mMiddleName: "",
    mLastName: "",
    mBestMan: "",
    mCitizenship: "USA",
    mdob: "",

    mmName: "",
    mmCitizenship: "",
    mmdob: "",
    mfName: "",
    mfCitizenship: "",
    mfdob: "",

    wFirstName: "",
    wMiddleName: "",
    wLastName: "",
    wBestWoman: "",
    wCitizenship: "USA",
    wdob: "",

    wmName: "",
    wmCitizenship: "",
    wmdob: "",
    wfName: "",
    wfCitizenship: "",
    wfdob: "",

    address: "",
    attendants: "",
    mSign: "",
    wSign: "",
  };
  @Output() open = new EventEmitter<{ content: string; msg: any }>();

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {}

  submitMarriage() {
    if (
      this.marriageForm.mSign &&
      this.marriageForm.wSign &&
      this.marriageForm.mFirstName &&
      this.marriageForm.wFirstName
    ) {
      this.dataService
        .createNewRegistration({
          ownerName:
            this.marriageForm.mFirstName +
            " and " +
            this.marriageForm.wFirstName,
          registryInfo: "Marriage",
          allInformation: this.marriageForm,
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
      console.log(this.marriageForm);
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
