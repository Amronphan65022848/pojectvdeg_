import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity-information',
  templateUrl: './activity-information.component.html',
  styleUrls: ['./activity-information.component.css']
})
export class ActivityInformationComponent implements OnInit {
  activityId: any;
  activity: any = []; 
  activitydetail: any = {};
  activitysum:any = {};

  constructor(private http: HttpClient,private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.activityId = +this.route.snapshot.paramMap.get('activityId')!;
    this.getallActivities();
    this.getActivityDetail();
    this.getActivitySum();
  }

  getallActivities(): void {
    this.http.get('http://localhost:8080/api/budget-summary/activity/'+this.activityId).subscribe(response => {
      this.activity = response ;
    });
  }


  getActivityDetail(): void {
    this.http.get('http://localhost:8080/api/activities/'+this.activityId).subscribe(response => {
      this.activitydetail = response ;
      console.log(this.activitydetail);
      
    });
  }

  getActivitySum(): void {
    this.http.get('http://localhost:8080/api/activity-summary/activity/'+this.activityId).subscribe(response => {
      this.activitysum = response ;
      console.log(this.activitysum);
      
    });
  }
}
