import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  user = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    illness: '',
    allergies: '',
    religion: '',
    foodallergies: '',
    contact: '',
  };


  constructor(private http: HttpClient,private router: Router) { }

  onSubmit() {
    // ส่งข้อมูล user ไปยัง API
    this.http.post('http://localhost:8080/api', this.user)
      .subscribe(
        response => {Swal.fire({
          title: 'register',
          text: 'register success',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: '!bg-green-500 !text-white', // ใช้ important class
          }

        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = `/login`; // Refresh the page
          }
        });
          
        },
        error => {
          Swal.fire('register', 'register error', 'error');
        }
      );
  }


  navigateToLogin(){
    this.router.navigate(['/login']);
  }
}
