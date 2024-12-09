import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {


  activities: any[] = [];
  loading: boolean = false;


  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit() {
    this.loading = true;
    this.fetchActivities(); // Call the method to fetch activities when the component initializes
  }

  fetchActivities() {
    this.http.get<any[]>('http://localhost:8080/api/activities').subscribe({
      next: (data) => {
        this.activities = data.sort((a, b) => a.activityId - b.activityId); // เรียงตาม activityId
        console.log('Fetched and sorted activities:', this.activities); // Log กิจกรรมที่ถูกเรียงแล้ว
      },
      error: (error) => {
        console.error('Failed to fetch activities:', error); // Handle error
      },
      complete: () => {
        this.loading = false; // Stop loading
      }
    });
  }

  updateActivityStatus(activity: any) {
    this.loading = true;
    // Send the updated status directly as a boolean
    this.http.put(`http://localhost:8080/api/activities/${activity.activityId}/status`, activity.status).subscribe({

      next: (response) => {

        console.log('Activity status updated successfully:', response);
      },
      error: (error) => {
        console.error('Failed to update activity status:', error);
      },
      complete: () => {
        this.loading = false; // Stop loading
      }
    });
  }

  gotoAdmin() {
    window.location.href = '/admin';
  }

  goToInformation(activityId: number): void {
    this.router.navigate(['/activity-files', activityId]);
  }

  addGoogleDriveLink(activity: any) {
    Swal.fire({
      title: 'Enter the Google Drive link',
      input: 'url',
      inputLabel: 'Google Drive URL',
      inputPlaceholder: 'Enter the link here...',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to enter a URL!';
        }
        return null;  // เพิ่มการคืนค่า null เมื่อไม่มีข้อผิดพลาด
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const url = result.value;
        const updatedActivity = { ...activity, informationLink: url };  // เพิ่มลิงก์ Google Drive

        // ส่งคำขอ POST เพื่ออัปเดตข้อมูลกิจกรรม
        this.http.post(`http://localhost:8080/api/activities/${activity.activityId}/update-link`, updatedActivity)
          .subscribe(response => {
            console.log('Link updated successfully:', response);
            activity.informationLink = url;  // อัปเดต UI หลังจากการอัปเดตสำเร็จ
            Swal.fire('Success', 'The Google Drive link has been added!', 'success');
          }, error => {
            console.error('Error updating link:', error);
            Swal.fire('Error', 'There was an error updating the link', 'error');
          });
      }
    });
  }

  gotoReport(activityId: number): void {
    this.router.navigate(['/activity-infor', activityId]);
  }

  gotoVolunteer(activityId: number): void {
    this.router.navigate(['/activity-sinup-list', activityId]);
  }

}
