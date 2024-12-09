import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {
  activityId: number = 0;
  donations: any[] = []; 
  activity: any = {};
  files: File | null = null;
  donator = {
    amount: '',
    fullName: '',
    contact: '',
    slip: '',
    activity: {
      activityId: 0
    }
  };

  imageSrc: string | ArrayBuffer | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.activityId = +this.route.snapshot.paramMap.get('activityId')!;
    this.getActivity();
    this.donator.activity.activityId = this.activityId;
    this.getDonations();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0]; // รับไฟล์ที่ผู้ใช้อัปโหลด
    if (file) {
      this.files = file; // เก็บไฟล์ไว้ในตัวแปร

      // สร้างตัวอ่านไฟล์เพื่อแปลงไฟล์เป็น Data URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result; // เก็บ Data URL ของภาพไว้ใน imageSrc
      };
      reader.readAsDataURL(file); // อ่านไฟล์ภาพเป็น Data URL
    }
  }

  getActivity() {
    this.http.get<any>('http://localhost:8080/api/activities/' + this.activityId).subscribe({
      next: (data) => {
        this.activity = data;
        console.log('Fetched activity:', this.activity);
      },
      error: (error) => {
        console.error('Failed to fetch activity:', error);
      },
    });
  }

  submitForm() {
    if (!this.donator.fullName || !this.donator.contact || !this.donator.amount || !this.files) {
      Swal.fire('Error', 'Please fill in all fields', 'error');
      return;
    }

    const imageFormData = new FormData();
    imageFormData.append('files', this.files);

    // Upload file first
    this.http.post<{ fileUrls: string[] }>('http://localhost:8080/api/v1/upload', imageFormData).subscribe({
      next: (response) => {
        if (response.fileUrls && response.fileUrls.length > 0) {
          this.donator.slip = response.fileUrls[0];

          // Once file is uploaded, submit donation form
          this.http.post('http://localhost:8080/api/donations', this.donator).subscribe({
            next: (donationResponse) => {
              console.log('Donation submitted successfully', donationResponse);
              
              Swal.fire({
                title: 'Success',
                text: 'Donation submitted successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                  confirmButton: '!bg-green-500 !text-white', // ใช้ important class
                }
              }).then((result) => {
                if (result.isConfirmed) {
                 window.location.reload(); // Refresh the page
                }
              });
            },
            error: (donationError) => {
              console.error('Error submitting donation:', donationError);
              Swal.fire('Error', 'Failed to submit donation. Please try again later.', 'error');
            }
          });
        } else {
          Swal.fire('Error', 'Failed to upload file. Please try again later.', 'error');
        }
      },
      error: (uploadError) => {
        console.error('Error uploading file:', uploadError);
        Swal.fire('Error', 'Failed to upload file. Please try again later.', 'error');
      }
    });
  }

  getDonations() {
    this.http.get<any[]>(`http://localhost:8080/api/donations/activity/${this.activityId}`).subscribe({
      next: (data) => {
        this.donations = data; // เก็บข้อมูลการบริจาค
        console.log('Donations fetched:', this.donations);
      },
      error: (error) => {
        console.error('Failed to fetch donations:', error);
      }
    });
  }



}
