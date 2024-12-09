import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  activityId: number = 0;
  activity: any = {};
  status: boolean = true;

  @Input() isVisible: boolean = false;
  @Input() isVisible1: boolean = false;
  @Output() close: EventEmitter<void> = new EventEmitter();

  // ตัวแปรเพื่อเก็บข้อมูลที่กรอกในฟอร์ม
  budgetSummary = {
    item: '',
    budgetGiven: 0,
    budgetUsed: 0,
    remainingBudget: 0,
    activity: {
      activityId: 0
    }
  };

  activitySummary = {
    mediaAndPropsDepartment: '',
    locationDepartment: '',
    cons: '',
    problemsFaced: '',
    solutionsToProblems: '',
    activity: {
      activityId: 0
    }
  };

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // รับ activityId จากพารามิเตอร์ใน URL
    this.activityId = +this.route.snapshot.paramMap.get('activityId')!;
    this.budgetSummary.activity.activityId = this.activityId;
    this.activitySummary.activity.activityId = this.activityId;

    this.getActivity(); // ตรวจสอบค่า activityId
  }

  getActivity() {
    this.http.get<any>('http://localhost:8080/api/activities/' + this.activityId).subscribe({
      next: (data) => {
        this.activity = data;
        const endDate = new Date(this.activity.endDate);
        if (endDate < new Date() || this.activity.totalvolunteerAmount === this.activity.volunteerAmount) {
          this.status = false;
        } else {
          this.status = true;
        }
      },
      error: (error) => {
        console.error('Failed to fetch activity:', error);
      }
    });
  }

  submitBudgetSummaryForm() {
    this.http.post('http://localhost:8080/api/budget-summary', this.budgetSummary)
      .subscribe(response => {
        console.log('Budget Summary submitted successfully:', response);
        this.closeModal();  // ปิด modal เมื่อส่งข้อมูลสำเร็จ
      }, error => {
        console.error('Error occurred during Budget Summary submission:', error);
      });
  }

    // Method สำหรับการ POST ข้อมูล Activity Summary
    submitActivitySummaryForm() {
      this.http.post('http://localhost:8080/api/activity-summary', this.activitySummary)
        .subscribe(response => {
          console.log('Activity Summary submitted successfully:', response);
          this.closeModal();  // ปิด modal เมื่อส่งข้อมูลสำเร็จ

          this.router.navigate(['/admin-list']);  // นำทางไปยังหน้า adminlist
        }, error => {
          console.error('Error occurred during Activity Summary submission:', error);
        });
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
    this.close.emit();  // Emit the close event
  }
}
