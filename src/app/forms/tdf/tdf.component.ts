import { Component } from '@angular/core';
import { UserDetailModel } from '../../models/user-details.model';

@Component({
  selector: 'app-tdf',
  templateUrl: './tdf.component.html',
  styleUrls: ['./tdf.component.scss']
})
export class TdfComponent {
  
  userDetail: UserDetailModel = new UserDetailModel();
  userDetailList: UserDetailModel[] = [];

  onSubmit() {
    const newUserDetail: UserDetailModel = { ...this.userDetail };
    
    this.userDetailList.push(newUserDetail);

    this.userDetail = new UserDetailModel();
  }
}
