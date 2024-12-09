import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity-signup-list',
  templateUrl: './activity-signup-list.component.html',
  styleUrls: ['./activity-signup-list.component.css']
})
export class ActivitySignupListComponent implements OnInit{
  
  loading: boolean = true;
  activities: any[] = [];
  activityId: number = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.activityId = +this.route.snapshot.paramMap.get('activityId')!;
    this.getActivity()
  }


  getActivity() {
    this.http.get<any>('http://localhost:8080/api/participant-details/activity/' + this.activityId).subscribe({
      next: (data) => {
        this.activities = data;
        console.log('Fetched activity:', this.activities);
      },
      error: (error) => {
        console.error('Failed to fetch activity:', error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
