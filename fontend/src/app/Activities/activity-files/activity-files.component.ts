import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity-files',
  templateUrl: './activity-files.component.html',
  styleUrls: ['./activity-files.component.css']
})
export class ActivityFilesComponent implements OnInit {

  activityId: number = 0;
  loading: boolean = false;
  activity: any = null; // Change to a single activity object

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.activityId = +(this.route.snapshot.paramMap.get('activityId') || '0');
    this.fetchActivity();
  }

  fetchActivity() {
    this.loading = true;
    this.http.get<any>('http://localhost:8080/api/activities/' + this.activityId).subscribe({
      next: (data) => {
        this.activity = data; 
        console.log('Fetched activity:', this.activity);
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
