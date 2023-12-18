import { Component, ViewChild } from '@angular/core';
import { PersonDetailFormModel } from '../../models/user-details-form.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-details-form',
  templateUrl: './user-details-form.component.html',
  styleUrls: ['./user-details-form.component.scss']
})
export class UserDetailsFormComponent {

  @ViewChild('myForm') myForm!: NgForm;

  personDetail: PersonDetailFormModel = new PersonDetailFormModel();
  personDetailList: PersonDetailFormModel[] = [];

  onDetailSubmit() {
    const newPersonDetail: PersonDetailFormModel = { ...this.personDetail };
    this.personDetailList.push(newPersonDetail);
    this.personDetail = new PersonDetailFormModel();

    this.myForm.resetForm();
  }

  calculateAge() {
    if (this.personDetail.dob) {
      const dob = new Date(this.personDetail.dob);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      this.personDetail.age = age.toString();
    }
  }

  onPhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    input.value = value.replace(/\D/g, '');
  }

  showAlert(message: string) {
    if (message) {
      alert(message);
    }
  }
}
