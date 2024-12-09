import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {

  otp: string = '';
  email: string = '';
  newPassword: string = '';
  reset_code: string = '';
  code_creation_time: number = 0; // Time when code is generated
  readonly CODE_EXPIRATION_TIME: number = 60 * 1000; 
  isPasswordEnabled: boolean  = false;
  isOTPEnabled: boolean = false;

  constructor(private http: HttpClient,private router: Router) {}

  // ฟังก์ชันสำหรับส่งข้อมูลเมื่อกดปุ่ม Submit
  onSubmit() {
    if (this.email && this.newPassword && this.otp) {
      const formData = {
        otp: this.otp,
        email: this.email,
        newPassword: this.newPassword
      };
      console.log(formData);
      

      // this.http.post('your-backend-url/reset-password', formData)
      //   .subscribe(
      //     response => {
      //       console.log('Password reset successful', response);
      //       // ทำการแสดงข้อความแจ้งเตือนหรือเปลี่ยนหน้า
      //     },
      //     error => {
      //       console.error('Error occurred while resetting password', error);
      //     }
      //   );
    }
  }

  // ฟังก์ชันสำหรับส่ง OTP ใหม่
  

  // 60 seconds in milliseconds


  // Generate random code
  generateRandomCode(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      code += chars[randomIndex];
    }
    return code;
  }

  // Send email using EmailJS
  sendResetCode(email: string) {
    this.http.get('http://localhost:8080/api/check-email?email=' + this.email, { responseType: 'text' }).subscribe(
      (response: string) => {
        if (response.trim() === "Email exists in the database.") {
          // If email exists, send the reset code
          const code = this.generateRandomCode(6);
          this.reset_code = code;
          this.code_creation_time = Date.now(); // Store current time

          const templateParams = {
            to_email: email,
            reset_code: code
          };
          
          emailjs.send('service_wa32txk', 'template_3ccxm1a', templateParams, 'hkpb08D3ZGHYTJzBY')
            .then((response) => {
              Swal.fire({
                title: 'สำเร็จ!',
                text: 'ส่งรหัสยืนยันไปยังอีเมลของคุณแล้ว!',
                icon: 'success',
                customClass: {
                  confirmButton: 'bg-green-500 text-white' // ปรับสีปุ่ม
                }
              });
              
              
              this.isPasswordEnabled = true;
            }, (error) => {
              console.error('Error sending email', error);
            });
        } else {
          // Show error if email does not exist
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'อีเมลนี้ไม่มีในระบบ!',
            customClass: {
              confirmButton: '!bg-green-500 !text-white', // ใช้ important class
            }
            
          });
        }
      },
      (error) => {
        console.error('Error checking email existence', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'เกิดข้อผิดพลาดในการตรวจสอบอีเมล!',
          customClass: {
            confirmButton: '!bg-green-500 !text-white', // ใช้ important class
          }
        });
      }
    );
  }
  // Handle form submission
  onSubmits() {
    if (this.email) {
      this.sendResetCode(this.email);
    } else {
      console.log('Please enter an email address.');
    }
  }

  // Check the reset code
  checkcode() {
    const currentTime = Date.now();
  
    // ตรวจสอบว่ารหัสหมดอายุหรือไม่
    if (currentTime - this.code_creation_time > this.CODE_EXPIRATION_TIME) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'รหัสหมดอายุแล้ว!',
        customClass: {
          confirmButton: '!bg-green-500 !text-white', // ใช้ important class
        }
      });
      return;
    }
  
    // ตรวจสอบว่ารหัส OTP ตรงกับรหัสที่ส่งไปหรือไม่
    if (this.otp === this.reset_code) {
      // ส่งข้อมูลใน query parameters
      const url = `http://localhost:8080/api/update-password?email=${this.email}&newPassword=${this.newPassword}`;
  
      this.http.put(url, null,{ responseType: 'text' }).subscribe(
        (response:string) => {
          console.log('Password reset successful', response);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'เปลี่ยนรหัสผ่านสำเร็จ!',
            customClass: {
              confirmButton: '!bg-green-500 !text-white', // ใช้ important class
            }
            
          }).then(() => {
            this.router.navigate(['/login']).then(() => {
              window.location.reload();
            });
          });
        },
        (error) => {
          console.error('Error occurred while resetting password', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน!',
            customClass: {
              confirmButton: '!bg-green-500 !text-white', // ใช้ important class
            }
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'รหัสไม่ถูกต้อง!',
        customClass: {
          confirmButton: '!bg-green-500 !text-white', // ใช้ important class
        }
      });
    }
  }
  
}
