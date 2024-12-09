import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-guest',
  templateUrl: './login-guest.component.html',
  styleUrls: ['./login-guest.component.css']
})
export class LoginGuestComponent {
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']); // นำทางไปยังหน้า /login
  }

  navigateToRegister() {
    this.router.navigate(['/register']); // นำทางไปยังหน้า /register (ถ้าต้องการ)
  }
}
