import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private router: Router) {}

  logout() {
    // ลบ token ออกจาก localStorage
    localStorage.removeItem('token');

    // นำทางไปยังหน้า login
    this.router.navigate(['/login']);
  }
}
