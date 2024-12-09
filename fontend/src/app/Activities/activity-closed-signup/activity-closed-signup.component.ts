import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activity-closed-signup',
  templateUrl: './activity-closed-signup.component.html',
  styleUrls: ['./activity-closed-signup.component.css']
})
export class ActivityClosedSignupComponent implements OnInit {
 
  activityId: number = 0;
  activity: any = {};

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { } 

  ngOnInit() {
    // รับ activityId จากพารามิเตอร์ใน URL
    this.activityId = +this.route.snapshot.paramMap.get('activityId')!;
    this.getActivity()// ตรวจสอบค่า activityId
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
      complete: () => {
        
      }
    });
  }

  gotovolunteer() {
    this.router.navigate(['/activity-sinup-list', this.activityId]);
  }


  gotoactivity() {
    this.router.navigate(['/activity-infor', this.activityId]);
  }

}
