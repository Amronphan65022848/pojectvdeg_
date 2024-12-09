import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activity-creation-admin',
  templateUrl: './activity-creation-admin.component.html',
  styleUrls: ['./activity-creation-admin.component.css']
})
export class ActivityCreationAdminComponent {
  totalSponsors: number = 0;
  selectedImageFile: File | null = null;  // เก็บไฟล์ภาพสำหรับกิจกรรม
  selectedSponsorFiles: File[] = [];  // เก็บไฟล์ภาพสำหรับสปอนเซอร์
  newSponsorFiles: File[] = [];
  objectURL: string = "";


  activityImageUrl: string = '';
  activityName: string = '';
  placeOfActivity: string = '';
  activityDescription: string = '';
  volunteerAmount: number | null = null;
  startDate: string | null = null;
  endDate: string | null = null;
  sponsors: string[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  // ฟังก์ชันนี้จะถูกเรียกเมื่อผู้ใช้เลือกไฟล์สำหรับกิจกรรม
  onFileSelected(event: any) {
    const file = event.target.files[0];  // เลือกไฟล์แรกจาก input
    if (file) {
      this.selectedImageFile = file;
      this.objectURL = URL.createObjectURL(file);
      console.log(this.objectURL);
      // สร้าง URL ของไฟล์ที่เลือก
    }
  }
  // ฟังก์ชันนี้ถูกเรียกเมื่อผู้ใช้เลือกไฟล์สำหรับสปอนเซอร์
  onFileSelectedsponsor(event: any) {
    console.log("กดไฟล์สปอนเซอร์");
    const files = event.target.files;
    if (files) {
      this.newSponsorFiles = []; // เคลียร์ array ก่อนเลือกใหม่
      for (let file of files) {
        this.selectedSponsorFiles.push(file);
        this.newSponsorFiles.push(file);
        this.totalSponsors++;  // เก็บไฟล์สปอนเซอร์ลงใน array
      }
      console.log(this.selectedSponsorFiles);
    }
  }

  // ฟังก์ชันสำหรับการคลิกเพื่อเปิด input file
  triggerFileInputClick(fileInput: HTMLInputElement) {
    fileInput.click();
  }


  submitForm() {

    if (this.selectedImageFile) {
      // Create a FormData object to hold the selected image file
      const imageFormData = new FormData();
      imageFormData.append('files', this.selectedImageFile);

      const imagesFormData = new FormData();
      this.selectedSponsorFiles.forEach(file => {
        imagesFormData.append('files', file); // Append each sponsor file
      });// Use 'files' as the key

      // Post the image file
      this.http.post<{ fileUrls: string[] }>('http://localhost:8080/api/v1/upload', imageFormData).subscribe({
        next: (response) => {
          if (response.fileUrls && response.fileUrls.length > 0) {
            this.activityImageUrl = response.fileUrls[0];
            if (this.selectedSponsorFiles.length > 0) {
              this.http.post<{ fileUrls: string[] }>('http://localhost:8080/api/v1/upload', imagesFormData).subscribe({
                next: (response) => {
                  if (response.fileUrls && response.fileUrls.length > 0) {
                    this.sponsors = response.fileUrls;
                    const formData = {
                      activityName: this.activityName,
                      placeOfActivity: this.placeOfActivity,
                      activityDescription: this.activityDescription,
                      volunteerAmount: this.volunteerAmount,
                      activityImageUrl: this.activityImageUrl,
                      startDate: this.startDate,
                      endDate: this.endDate,
                      sponsors: this.sponsors
  
                    };
                    if (!this.activityName || !this.placeOfActivity || !this.activityDescription ||
                      this.volunteerAmount === null || !this.activityImageUrl ||
                      !this.startDate || !this.endDate) {
  
                        Swal.fire('ตรวจสอบความถูกต้อง', 'กรุณากรอกฟอร์มให้ถูกต้อง!', 'error');
                    }
                    else {
                      this.http.post('http://localhost:8080/api/activities', formData).subscribe({  
                        next: (response) => {
                          console.log('Activity created successfully:', response);
                          Swal.fire({
                            title: 'createdsuccessfully!',
                            text: 'Activity created successfully!',
                            icon: 'success',
                            confirmButtonText: 'OK',
                            customClass: {
                              confirmButton: '!bg-green-500 !text-white', // ใช้ important class
                            }
                          }).then((result) => {
                            if (result.isConfirmed) {
                              window.location.href = `/admin-list/` ; // Refresh the page
                            }
                          });
                        },
                        error: (error) => {
                          console.error('Error creating activity:', error);
                        }
                      });
                    }
                  }
                  else {
                    console.log('No file URLs returned in response.');
                  }
                },
                error: (error) => {
                  console.error('Image Upload failed:', error);
                }
              });
            }else{
              const formData = {
                activityName: this.activityName,
                placeOfActivity: this.placeOfActivity,
                activityDescription: this.activityDescription,
                volunteerAmount: this.volunteerAmount,
                activityImageUrl: this.activityImageUrl,
                startDate: this.startDate,
                endDate: this.endDate,
                sponsors: this.sponsors

              };
              if (!this.activityName || !this.placeOfActivity || !this.activityDescription ||
                this.volunteerAmount === null || !this.activityImageUrl ||
                !this.startDate || !this.endDate) {

                  Swal.fire('ตรวจสอบความถูกต้อง', 'กรุณากรอกฟอร์มให้ถูกต้อง!', 'error');
              }
              else {
                this.http.post('http://localhost:8080/api/activities', formData).subscribe({  
                  next: (response) => {
                    console.log('Activity created successfully:', response);
                    Swal.fire('success', 'Activity created successfully!', 'success');
                  },
                  error: (error) => {
                    console.error('Error creating activity:', error);
                  }
                });
              }
              
            }
            

          } else {
            console.log('No file URLs returned in response.');
          }
        },
        error: (error) => {
          console.error('Image Upload failed:', error);
        }
      });
    } else {
      console.error('No image file selected for upload.');
    }

  }

  clearForm() {
    this.startDate = null;
    this.endDate = null;
  }
  clearSponsor() {
    this.selectedSponsorFiles = [];
    this.newSponsorFiles = [];
    this.totalSponsors = 0;
  }
  clearactivityIMG() {
    this.selectedImageFile = null;
    this.objectURL = "";
  }

}
