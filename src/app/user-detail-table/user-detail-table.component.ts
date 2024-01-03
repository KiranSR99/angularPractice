import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { HttpHandlerServiceService } from '../services/http-handler-service.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-user-detail-table',
  templateUrl: './user-detail-table.component.html',
  styleUrl: './user-detail-table.component.scss',
})
export class UserDetailTableComponent implements OnInit {
  apiResponseData: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: HttpHandlerServiceService,
    private router: Router,
    private toast: ToastService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.fetchData();
      }
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.apiService.getPersonalDetail().subscribe(
      (response) => {
        this.apiResponseData = response.data;
      },
      (error) => {
        console.error('Error Aayo.');
      },
      () => {
        console.log('API Call vayo..');
      }
    );
  }

  //Opening personal detail in another page according to id
  viewDetail(userId: number) {
    this.router.navigate(['main/user-details-list', userId]);
  }

  //Deleting personal details according to id
  deletePersonalDetail(userId: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.apiService.deletePersonalDetail(userId).subscribe(
        () => {
          this.toast.showSuccess(
            `Personal detail with id ${userId} deleted successfully.`
          );

          // Remove the deleted record from the displayed data
          this.apiResponseData = this.apiResponseData.filter(
            (item: any) => item.id !== userId
          );
        },
        (error) => {
          console.error('Error while deleting personal detail:', error);
        }
      );
    }
  }

  //Updating personal detail using update form
  openUpdateForm(userId: number) {
    this.router.navigate(['main/form-update', userId]);
  }

  goToForm(){
    this.router.navigate(['main/form']);
  }
}
