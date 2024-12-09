import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: any = {}; // เก็บข้อมูลผู้ใช้
  @Input() isVisible: boolean = false;
  @Input() isVisible1: boolean = false;
  @Output() close: EventEmitter<void> = new EventEmitter();
  profileImageUrl: string = '../../assets/imgs/profile/proflies.svg'; 

  firstName: string = ''; // เก็บค่าจาก input field
  lastName: string = '';  // เก็บค่าจาก input field
  email: string = '';
  phone: string = '';
  illness: string = '';
  allergies: string = '';
  foodallergies: string = '';
  contact: string = '';
  religion: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // ถอดรหัส JWT
      console.log(payload);
      
      this.user = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phone: payload.phone,
        profileImage: payload.imageprofile,
        contact: payload.contact,
        allergies: payload.allergies,
        illness: payload.illness,
        foodallergies: payload.foodallergies,
        religion: payload.religion,
        time: payload.time,
        id: payload.id // รหัสผู้ใช้
      };

      console.log(this.user);

      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.email = this.user.email;
      this.phone = this.user.phone;
      this.illness = this.user.illness;
      this.allergies = this.user.allergies;
      this.foodallergies = this.user.foodallergies;
      this.contact = this.user.contact;
      this.religion = this.user.religion;

      console.log(this.foodallergies);

      this.profileImageUrl = this.user.profileImage || this.profileImageUrl;
      
    }
  }

 
  // ฟังก์ชันสำหรับการอัปเดตชื่อและนามสกุล
  updateName() {
    const id = this.user.id; // ใช้ id จาก JWT
    const url = `http://localhost:8080/api/${id}/update-name?firstName=${this.firstName}&lastName=${this.lastName}`;
    
    this.http.put(url, null).subscribe({
      next: (response) => {
        console.log('Name updated successfully', response);
        this.logout()
        this.closeModal(); // ปิด modal เมื่อสำเร็จ
      },
      error: (error) => {
        console.error('Error updating name:', error);
      }
    });
  }

  logout(){
    // ลบ token ออกจาก localStorage
    localStorage.removeItem('token');
    // นำทางไปยังหน้า login
    this.router.navigate(['/login']);
  }

  updateDetails() {
    const id = this.user.id; // ใช้ id จาก JWT
    const url = `http://localhost:8080/api/${id}/update-details`;

    const updatePayload = {
      email: this.email,
      phone: this.phone,
      illness: this.illness,
      allergies: this.allergies,
      foodallergies: this.foodallergies,
      contact: this.contact,
      religion: this.religion
    };

    this.http.put(url, updatePayload).subscribe({
      next: (response) => {
        console.log('Details updated successfully', response);
        this.logout()
      },
      error: (error) => {
        console.error('Error updating details:', error);
      }
    });
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImageUrl = reader.result as string; // แสดงรูปที่เลือก
      };
      reader.readAsDataURL(file);
    }
  }


  openModal() {
    this.isVisible = true;
  }

  openModal1() {
    this.isVisible1 = true;
  }

  closeModal() {
    this.isVisible = false;
    this.isVisible1 = false;
    this.close.emit(); // Emit the close event
  }
}
