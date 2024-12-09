// app.component.ts
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar *ngIf="showNavbar"></app-navbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showNavbar = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // กำหนดเส้นทางที่ไม่ต้องการให้แสดง Navbar
        const currentUrl = event.urlAfterRedirects;
        this.showNavbar = !(
          currentUrl === '/login' ||
          currentUrl === '/register' ||
          currentUrl === '/reset'
        );
      }
    });
  }
}
