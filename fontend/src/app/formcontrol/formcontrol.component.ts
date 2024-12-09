import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formcontrol',
  templateUrl: './formcontrol.component.html',  // ต้องตรงกับชื่อไฟล์จริง
  styleUrls: ['./formcontrol.component.css']
})
export class FormcontrolComponent implements OnInit {
  activityId: number = 0;
  activity: any = {};
  status: boolean = true;
  personId: number = 0;

  participantDetail = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    allergies: '',
    medicalHistory: '',
    emergencyContact: '',
    activity: {
      activityId: this.activityId
    },
    person: {
      id: 0
    }


  };

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // ถอดรหัส JWT
      console.log(payload);
      this.participantDetail.person.id = payload.id
    }
    this.activityId = +this.route.snapshot.paramMap.get('activityId')!;

    this.participantDetail.activity.activityId = this.activityId


    this.getActivity()// ตรวจสอบค่า activityId
    this.checkperson()
  }



  checkperson() {
    this.http.get('http://localhost:8080/api/participant-details/check-registration?activityId=' + this.activityId + '&personId=' + this.participantDetail.person.id,
      { responseType: 'text' }).subscribe(response => {
        console.log(response);
        const endDate = new Date(this.activity.endDate);
        if (endDate < new Date() || this.activity.totalvolunteerAmount == this.activity.volunteerAmount) {
          this.router.navigate(['/activity-close', this.activityId]);
        }
        else if (response === 'Person has already registered for this activity.') {
          this.router.navigate(['/activity-fin', this.activityId]);
        }
      });
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



  submitForm() {
    // ส่งข้อมูลไปยัง API เพื่อบันทึก participantDetail
    this.http.post('http://localhost:8080/api/participant-details', this.participantDetail)
      .subscribe(response => {
        console.log('Signup success:', response);

        // หลังจากลงทะเบียนเสร็จแล้ว เรียก API เพื่อเพิ่มจำนวนอาสาสมัครในกิจกรรม
        this.http.post('http://localhost:8080/api/activities/' + this.activityId + '/incrementVolunteer', {})
          .subscribe(() => {
            // แสดง SweetAlert เมื่อสำเร็จ
            Swal.fire({
              title: 'Success',
              text: 'ลงทะเบียนกิจกรรมสำเร็จ',
              icon: 'success',
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: 'bg-green-500 text-white' // Custom CSS Class ของปุ่ม
              }
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload(); // นำทางไปหน้า home เมื่อกดปุ่ม OK
              }
            });
          }, error => {
            console.error('Error occurred during volunteer increment:', error);
          });
      }, error => {
        console.error('Error occurred during signup:', error);
        Swal.fire({
          title: 'Error',
          text: 'เกิดข้อผิดพลาดในการลงทะเบียน',
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: '!bg-green-500 !text-white', // ใช้ important class
          }
        });
      });
  }



  goToInformation(): void {
    this.router.navigate(['/activity-sinup-list', this.activityId]);
  }

}
