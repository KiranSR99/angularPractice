import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss'
})
export class ReactiveFormComponent implements OnInit {
  
  myForm: any;
  constructor(private fb: FormBuilder){}

  ngOnInit(): void {

    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required, Validators.maxLength(10)],
      address: ['', Validators.required],
      dob: ['', Validators.required],
      age: ['']
    });
    
    
  }

  onReactiveFormSubmit(){
    console.log(this.myForm.value);
  }


  calculateAge() {
    if (this.myForm.dob) {
      const dob = new Date(this.myForm.dob);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      this.myForm.age = age.toString();
    }
  }

}
