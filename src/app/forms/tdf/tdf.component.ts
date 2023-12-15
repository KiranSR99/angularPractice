import { Component } from '@angular/core';
import { UserDetailModel } from './models/user-details.model';

@Component({
  selector: 'app-tdf',
  templateUrl: './tdf.component.html',
  styleUrl: './tdf.component.scss'
})
export class TdfComponent {

  userDetail: UserDetailModel = new UserDetailModel();
  
  userDetailList: Array<UserDetailModel> = new Array<UserDetailModel>;

  // dispalyDetail: Array<UserDetailModel> |undefined;

  showCard = false;


  onSubmit(){
    // this.showCard = true;
    
    // console.log("Your Details:");
    // console.log(this.userDetail.name);
    // console.log(this.userDetail.email);
    // console.log(this.userDetail.phone);
    // console.log(this.userDetail.address);

    this.userDetailList.push(this.userDetail);



  }

}
