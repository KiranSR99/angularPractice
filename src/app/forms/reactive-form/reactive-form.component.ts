import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
})
export class ReactiveFormComponent implements OnInit {

  formDetailList: any[] = [];
  myForm: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, this.emailPatternValidator]],
      phone: ['', [Validators.required, this.phoneNumberValidator]],
      address: ['', Validators.required],
      dob: ['', Validators.required],
      age: ['']
    });
  }

  onReactiveFormSubmit() {
    if (this.myForm.valid) {
      const newFormDetail: any = { ...this.myForm.value };
      this.formDetailList.push(newFormDetail);
      this.myForm.reset();
    }
  }

  get form(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }

  calculateAge() {
    if (this.myForm.get('dob')?.value) {
      const dob = new Date(this.myForm.get('dob')?.value);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      this.myForm.get('age')?.setValue(age.toString());
    }
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

  showAlert(){
    if(this.form['name']?.invalid && this.form['name']?.touched){
      alert("Name is required.");
    }
  }

  
}


// emailPatternValidator(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     const email: string = control.value;
  //     if (!email) {
  //       return null; // Return null if the field is empty (let required validator handle this case)
  //     }
  
  //     // Regular expression pattern for a basic email validation
  //     const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  //     if (emailPattern.test(email)) {
  //       return null; // Validation passes
  //     }
  
  //     return { 'emailPatternError': { value: email } }; // Validation fails
  //   };
  // }

  // phoneNumberPatternValidator(): ValidatorFn{
  //   return (control: AbstractControl): {[key: string]: any} | null => {
  //     const phone : string = control.value;
  //     if(!phone){
  //       return null;
  //     }

  //     const phonePattern: RegExp = /^\d{10}$/;

  //     if(phonePattern.test(phone)){
  //       return null;
  //     }
      
  //     return { 'phonePatternError': {value: phone}};
  //   }
  // }