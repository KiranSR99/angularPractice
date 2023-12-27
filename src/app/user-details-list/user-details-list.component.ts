import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { param } from 'jquery';

@Component({
  selector: 'app-user-details-list',
  templateUrl: './user-details-list.component.html',
  styleUrls: ['./user-details-list.component.scss'],
})
export class UserDetailsListComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  detailsToDisplay: any;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      const userData = params['data']; // Retrieve user data from query params
      if (userData) {
        try {
          this.detailsToDisplay = JSON.parse(userData); // Parse the received JSON string
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
    });
  }
}
