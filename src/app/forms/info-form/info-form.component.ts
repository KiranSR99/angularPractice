import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  FormArray,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { DatePipe, Location } from '@angular/common';
import { AgeServiceService } from '../../services/age-service.service';
import { HttpHandlerServiceService } from '../../services/http-handler-service.service';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-info-form',
  templateUrl: './info-form.component.html',
  styleUrl: './info-form.component.scss',
})
export class InfoFormComponent implements OnInit {
  userInfo: any;
  userInfoList: any[] = [];
  maxDate: any;
  familyInfo: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private date: DatePipe,
    private calculateAge: AgeServiceService,
    private apiService: HttpHandlerServiceService,
    private toast: ToastService,
    private location:Location
  ) {}

  ngOnInit(): void {
    this.maxDate = this.date.transform(new Date(), 'yyyy-MM-dd');
    this.userInfo = this.fb.group({
      firstName: [undefined, [Validators.required]],
      lastName: [undefined, [Validators.required]],
      dob: [undefined, [Validators.required]],
      age: [undefined, [Validators.required]],
      email: [undefined, [Validators.required, this.emailPatternValidator]],
      phone: [undefined, [Validators.required, this.phoneNumberValidator]],

      familyDetails: this.fb.array([
        this.fb.group({
          firstName: [undefined, [Validators.required]],
          lastName: [undefined, [Validators.required]],
          dob: [undefined, [Validators.required]],
          age: [undefined, [Validators.required]],
          email: [undefined, [Validators.required, this.emailPatternValidator]],
          phone: [undefined, [Validators.required, this.phoneNumberValidator]],
        }),
      ]),
    });
  }


  //getter method to get family details array
  get familyDetails(): FormArray {
    return this.userInfo.get('familyDetails') as FormArray;
  }

  //method to add the dynamic div to enter family members' details
  addFamilyDetails(event: Event) {
    event.preventDefault();

    this.familyDetails.push(
      this.fb.group({
        firstName: [undefined, [Validators.required]],
        lastName: [undefined, [Validators.required]],
        dob: [undefined, [Validators.required]],
        age: [undefined, [Validators.required]],
        email: [undefined, [Validators.required, this.emailPatternValidator]],
        phone: [undefined, [Validators.required, this.phoneNumberValidator]],
      })
    );
  }

  //method to delete the div to enter family members' details
  deleteFamilyDetails(i: number) {
    return this.familyDetails.removeAt(i);
  }

  //On submitting the form by a user
  onUserInfoFormSubmit(data: any) {
    if (this.userInfo.valid) {
      this.apiService.addPersonalDetail(data).subscribe(
        (response) => {
          // console.log('Successful.');
          if (response.status == 'Success') {
            this.toast.showSuccess('Personal Detail saved successfully.');
          } else {
            this.toast.showError("Unsuccessful");
          }
        },
        (error) => {
          console.error('Error while saving data.');
        },
        () => {
          console.log('API Call Complete.');
        }
      );
    }
    this.location.back();
  }

  getAge(formGroup: FormGroup): void {
    const dob = formGroup.get('dob')?.value;
    formGroup.get('age')?.setValue(this.calculateAge.calculateAge(dob));
  }

  getAgeForFamilyMember(index: number) {
    const familyDetailsForm = this.familyDetails.at(index) as FormGroup;
    const dob = familyDetailsForm.get('dob')?.value;
    familyDetailsForm
      .get('age')
      ?.patchValue(this.calculateAge.calculateAge(dob));
  }

  //To validate the email
  emailPatternValidator(control: FormControl) {
    const email: string = control.value;
    const emailPattern: RegExp =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailPattern.test(email)) {
      return null;
    } else {
      return { emailPatternError: true };
    }
  }

  //To validate the phone number
  phoneNumberValidator(control: FormControl) {
    const phone: string = control.value;
    const phonePattern: RegExp = /^\d{10}$/;

    if (phonePattern.test(phone)) {
      return null;
    } else {
      return { phonePatternError: true };
    }
  }

  //To clear the form
  onUserFormReset() {
    return this.userInfo.reset();
  }

  //Opening personal detail in another page according to id
  viewDetail(userId: number) {
    this.router.navigate(['/user-details-list', userId]);
  }

  //Deleting personal details according to id
  deletePersonalDetail(userId: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.apiService.deletePersonalDetail(userId).subscribe(
        () => {
          console.log(
            `Personal detail with ID ${userId} deleted successfully.`
          );
          alert(`Personal detail with ID ${userId} deleted successfully.`);
        },
        (error) => {
          console.error('Error while deleting personal detail:', error);
        }
      );
    }
  }

  //Updating personal detail using update form
  openUpdateForm(userId: number) {
    this.router.navigate(['/form-update', userId]);
  }
}
