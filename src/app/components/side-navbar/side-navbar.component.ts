import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.scss',
})
export class SideNavbarComponent {
  
  constructor(private router: Router) {}

  onButtonClick() {
    this.router.navigate(['main/personal-details']);
  }

  onDashboardClick() {
    this.router.navigate(['main/dashboard']);
    }
}
