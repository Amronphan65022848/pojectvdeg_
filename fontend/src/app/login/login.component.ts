import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private http: HttpClient, private router: Router) {} // Inject HttpClient


ngOnInit(): void {
  this.checktoken()
}
  onSubmit() {
    const formData = this.loginForm.value;

    // ส่งข้อมูลไปยัง API
    this.http
      .post('http://localhost:8080/api/login', formData, {
        responseType: 'text',
      })
      .subscribe({
        next: (response) => {
          console.log('Login successful', response);
          localStorage.setItem('token', response); // เก็บ token ไว้ใน Local Storage
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error occurred during login', error);
          Swal.fire('ล็อคอินไม่สำเร็จ', 'กรุณาตรวจสอบรหัสผ่านและอีเมล ตรงกันหรือไม่!', 'error');
          
        },
      });
  }

  // ฟังก์ชันที่เรียกเมื่อกด Continue as Guest
  continueAsGuest(event: Event) {
    event.preventDefault(); // ป้องกันการโหลดหน้าซ้ำ
    this.router.navigate(['/home']); // นำทางไปยังหน้า home
  }


  navigateToRegister(){
    this.router.navigate(['/register']);
  }

  navigateToForgot(){
    this.router.navigate(['/reset']);
  }

  checktoken(){
    if(localStorage.getItem('token') != null){
      this.router.navigate(['/home']);
    } 
  }
}
