import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormArray,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { DatePipe, Location } from '@angular/common';
import { AgeServiceService } from '../../services/age-service.service';
import { HttpHandlerServiceService } from '../../services/http-handler-service.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-info-update-form',
  templateUrl: './info-update-form.component.html',
  styleUrl: './info-update-form.component.scss',
})
export class InfoUpdateFormComponent {
  userInfo: any;
  userInfoList: any[] = [];
  maxDate: any;
  apiResponseData: any;
  userId: any;
  familyId: any;

  constructor(
    private fb: FormBuilder,
    private date: DatePipe,
    private calculateAge: AgeServiceService,
    private apiService: HttpHandlerServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
    this.userId = params['id'];

    // Fetch personal details and populate the form
    this.apiService.getPersonalDetailById(this.userId).subscribe(
      (data) => {
        this.populateFormWithData(data.data);
    });
  });

    //Getting the id of family detail according to personal detail
    this.apiService.getPersonalDetailById(this.userId).subscribe((data) => {
      if (Array.isArray(data.data.familyDetails)) {
        const allFamilyDetailIds = data.data.familyDetails.map(
          (detail: { id: any; }) => detail.id
          );
      }
    });

    

    this.maxDate = this.date.transform(new Date(), 'yyyy-MM-dd');
    this.userInfo = this.fb.group({
      id: this.userId,
      firstName: [undefined, [Validators.required]],
      lastName: [undefined, [Validators.required]],
      dob: [undefined, [Validators.required]],
      age: [undefined, [Validators.required]],
      email: [undefined, [Validators.required, this.emailPatternValidator]],
      phone: [undefined, [Validators.required, this.phoneNumberValidator]],

      familyDetails: this.fb.array([
        this.fb.group({
          id: [undefined],
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
        id: [undefined],
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
      // const updatedData = this.userInfo.value;
      this.apiService.updatePersonalDetail(data).subscribe(
        (response) => {
          if(response.status == "Success"){
            this.toast.showSuccess("Personal Detail updated successfully.");
            this.location.back();
          }
        },
        (error) => {
          console.error('Error while updating data.', error);
        },
        () => {
          console.log('API Call Complete.');
        }
      );

      //navigate back to table on successful update
      
    }
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
  // onUserFormReset() {
  //   return this.userInfo.reset();
  // }

  goBackToTable(){
    this.location.back();
  }

  populateFormWithData(data: any): void {
    // Set personal details to the form
    this.userInfo.patchValue({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      dob: data.dob,
      age: data.age,
      email: data.email,
      phone: data.phone,
    });
  
    // Remove the default family detail form group
    while (this.familyDetails.length !== 0) {
      this.deleteFamilyDetails(0);
    }
  
    // Loop through family details and add them to the form dynamically
    if (Array.isArray(data.familyDetails)) {
      data.familyDetails.forEach((familyDetail: any) => {
        this.addFamilyDetailsWithData(familyDetail);
      });
    }
  }
  
  addFamilyDetailsWithData(familyDetailData: any): void {
    this.familyDetails.push(
      this.fb.group({
        id: familyDetailData.id,
        firstName: familyDetailData.firstName,
        lastName: familyDetailData.lastName,
        dob: familyDetailData.dob,
        age: familyDetailData.age,
        email: familyDetailData.email,
        phone: familyDetailData.phone,
      })
    );
  }
  
}
