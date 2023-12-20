import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-family-details',
  templateUrl: './family-details.component.html',
  styleUrl: './family-details.component.scss',
})
export class FamilyDetailsComponent implements OnInit {
  detailsForm: any;
  formDetailList: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.detailsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, this.emailPatternValidator]],
      phone: ['', [Validators.required, this.phoneNumberValidator]],
      dob: ['', Validators.required],
      age: ['', Validators.required],

      familyDetails: this.fb.array([

      ]),
    });
  }

  get getFamilyDetails(): FormArray {
    return this.detailsForm.get('familyDetails') as FormArray;
  }

  addFamilyDetails(event: Event): void {
    event.preventDefault();

    this.getFamilyDetails.push(
      this.fb.group({
        familyFirstName: ['', [Validators.required]],
        familyLastName: ['', [Validators.required]],
        familyPhone: ['', [Validators.required, this.phoneNumberValidator]],
      })
    );
  }

  deleteFamilyDetails(i: number) {
    this.getFamilyDetails.removeAt(i);
  }

  onFormSubmit() {
    if (this.detailsForm.valid) {
      const newFormDetail: any = { ...this.detailsForm.value };
      this.formDetailList.push(newFormDetail);
      this.detailsForm.reset();

      console.log(this.detailsForm.value);
    }
  }

  resetThisForm() {
    this.detailsForm.reset();
  }

  calculateAge(): void {
    const dobValue = this.detailsForm.get('dob')?.value;
    if (dobValue) {
      const today = new Date();
      const dob = new Date(dobValue);
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < dob.getDate())
      ) {
        age--;
      }
      this.detailsForm.get('age')?.setValue(age.toString());
    }
  }

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

  phoneNumberValidator(control: FormControl) {
    const phone: string = control.value;
    const phonePattern: RegExp = /^\d{10}$/;

    if (phonePattern.test(phone)) {
      return null;
    } else {
      return { phonePatternError: true };
    }
  }

  dateValidator(control: FormControl) {
    const selectedDate: string = control.value;
    const today = new Date().toISOString().split('T')[0];

    if (selectedDate && selectedDate > today) {
      return { invalidDate: true };
    }

    return null;
  }
}
