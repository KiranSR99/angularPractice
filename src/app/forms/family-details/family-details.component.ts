import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-family-details',
  templateUrl: './family-details.component.html',
  styleUrl: './family-details.component.scss',
})
export class FamilyDetailsComponent implements OnInit {
  detailsForm: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.detailsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required, this.emailPatternValidator],
      phone: ['', Validators.required, this.phoneNumberValidator],
      dob: ['', Validators.required],
      age: ['', Validators.required],

      familyDetails: this.fb.array([
        this.fb.group({
          firstName: '',
          lastName: '',
          contact: '',
        }),
      ]),
    });
  }

  get getFamilyDetails(): FormArray {
    return this.detailsForm.get('familyDetails') as FormArray;
  }

  addFamilyDetails() {
    this.getFamilyDetails.push(
      this.fb.group({
        firstName: '',
        lastName: '',
        contact: '',
      })
    );
  }

  deleteFamilyDetails(i: number) {
    this.getFamilyDetails.removeAt(i);
  }

  emailPatternValidator(control: FormControl){
    const email: string = control.value;
    const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(emailPattern.test(email)){
      return null;
    }
    else{
      return { emailPatternError: true }
    }
  }

  phoneNumberValidator(control: FormControl){
    const phone: string = control.value;
    const phonePattern: RegExp = /^\d{10}$/;

    if(phonePattern.test(phone)){
      return null;
    }
    else{
      return { phonePatternError: true }
    }
  }


}
