import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormArray,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AgeServiceService } from '../../services/age-service.service';
import { HttpHandlerServiceService } from '../../services/http-handler-service.service';
import { response } from 'express';

@Component({
  selector: 'app-info-form',
  templateUrl: './info-form.component.html',
  styleUrl: './info-form.component.scss',
})
export class InfoFormComponent implements OnInit {
  userInfo: any;
  userInfoList: any[] = [];
  maxDate: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private date: DatePipe,
    private calculateAge: AgeServiceService,
    private apiService: HttpHandlerServiceService
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

      familyDetailsArray: this.fb.array([
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
    return this.userInfo.get('familyDetailsArray') as FormArray;
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
    // if (this.userInfo.valid) {
    // const newUserInfo: any = { ...this.userInfo };
    // this.userInfoList.push(newUserInfo);
    // this.userInfo.reset();

    // console.log(this.userInfo.value);

    // const userData = JSON.stringify(this.userInfo.value);
    // this.router.navigate(['/user-details-list'], {
    //   queryParams: { data: userData },
    // });

    // }

    this.apiService.addPersonalDetail(data).subscribe(
      (response) =>{
        console.log("Successful.");
      },
      (error) =>{
        console.error("Error while saving data.");
      },
      () => {
        console.log('API Call Complete.');
      }
    )


  }

  // calculateAge(formGroup: FormGroup): void {
  //   const dobValue = formGroup.get('dob')?.value;
  //   if (dobValue) {
  //     const today = new Date();
  //     const dob = new Date(dobValue);
  //     let age = today.getFullYear() - dob.getFullYear();
  //     const monthDiff = today.getMonth() - dob.getMonth();
  //     if (
  //       monthDiff < 0 ||
  //       (monthDiff === 0 && today.getDate() < dob.getDate())
  //     ) {
  //       age--;
  //     }
  //     formGroup.get('age')?.setValue(age.toString());
  //   }
  // }

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
}
