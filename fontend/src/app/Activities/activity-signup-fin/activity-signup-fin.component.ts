import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activity-signup-fin',
  templateUrl: './activity-signup-fin.component.html',
  styleUrls: ['./activity-signup-fin.component.css']
})
export class ActivitySignupFinComponent implements OnInit {
  
  activityId: number = 0
  activity: any = {}

  constructor(private route: ActivatedRoute, private http: HttpClient,private router: Router) { } 

  ngOnInit(): void {
    this.activityId = +this.route.snapshot.paramMap.get('activityId')!;
    this.getActivity();
  }


  getActivity() {
    this.http.get<any>('http://localhost:8080/api/activities/' + this.activityId).subscribe({
      next: (data) => {
        this.activity = data;
        console.log('Fetched activity:', this.activity);
        const endDate = new Date(this.activity.endDate);
        if (endDate < new Date()|| this.activity.totalvolunteerAmount == this.activity.volunteerAmount) {
          console.log("เกินวันสิ้นสุดกิจกรรม");
        } else {
          console.log("ยังไม่เกินวันสิ้นสุดกิจกรรม");
          console.log(endDate, 'test', new Date());
        }
      },
      error: (error) => {
        console.error('Failed to fetch activity:', error);
      },
      complete: () => {
      }
    });
  }

  backtohome() {
    this.router.navigate(['/home']);
  }

  gotovolunteer() {
    this.router.navigate(['/activity-sinup-list', this.activityId]);
  }


}
