import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { param } from 'jquery';
import { HttpHandlerServiceService } from '../services/http-handler-service.service';
import { response } from 'express';

@Component({
  selector: 'app-user-details-list',
  templateUrl: './user-details-list.component.html',
  styleUrls: ['./user-details-list.component.scss'],
})
export class UserDetailsListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private httpHandler: HttpHandlerServiceService
  ) {}

  userId: any;
  personalDetail: any;

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.userId = params['id'];
      this.getPersonalDetailById();
    });
  }

  getPersonalDetailById() {
    this.httpHandler.getPersonalDetailById(this.userId).subscribe(
      (response) => {
        this.personalDetail = response.data;
      },
      (error) => {
        console.error('Error while fetching data.', error);
      }
    );
  }
}
