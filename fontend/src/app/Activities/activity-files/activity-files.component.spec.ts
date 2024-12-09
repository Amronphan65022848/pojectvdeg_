import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityFilesComponent } from './activity-files.component';

describe('ActivityFilesComponent', () => {
  let component: ActivityFilesComponent;
  let fixture: ComponentFixture<ActivityFilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityFilesComponent]
    });
    fixture = TestBed.createComponent(ActivityFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
