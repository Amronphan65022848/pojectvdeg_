import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upcoming-activities-carousal',
  templateUrl: './upcoming-activities-carousal.component.html',
  styleUrls: ['./upcoming-activities-carousal.component.css']
})
export class UpcomingActivitiesCarousalComponent implements OnInit {

  activities: any[] = []; // สร้าง array สำหรับเก็บกิจกรรม
  user: any = {}; // เก็บข้อมูลผู้ใช้

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getActiveActivities();

    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // ถอดรหัส JWT
      console.log(payload);
      
      this.user = {
        role: payload.role
      };
    
      console.log(this.user.role);
      
    
  }
  }

  // Method สำหรับดึงข้อมูลกิจกรรมที่ active
  getActiveActivities() {
    this.http.get<any[]>('http://localhost:8080/api/activities/active')
      .subscribe(
        (response) => {
          this.activities = this.filterActivitiesByDate(response); // กรองกิจกรรมตามวันที่
          console.log('Filtered Active Activities:', this.activities);
        },
        (error) => {
          console.error('There was an error retrieving active activities:', error);
        }
      );
  }

  // Method สำหรับกรองกิจกรรมตามวันที่
  filterActivitiesByDate(activities: any[]): any[] {
    const today = new Date(); 
    return activities.filter(activity => {
      const startDate = new Date(activity.startDate); // แปลง startDate เป็น Date object// แปลง endDate เป็น Date object
      return today <= startDate ; // ตรวจสอบว่าวันนี้อยู่ในช่วงเวลา
    });
  }

  navigateToSignup(activityId: number) {
    if (this.user.role === 'admin') {
      this.router.navigate(['/activity-signup', activityId]);
    } else if (this.user.role === 'user') {
      this.router.navigate(['/formcontrol', activityId]);
    }
  }

}
