import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCreationAdminComponent } from './activity-creation-admin.component';

describe('ActivityCreationAdminComponent', () => {
  let component: ActivityCreationAdminComponent;
  let fixture: ComponentFixture<ActivityCreationAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityCreationAdminComponent]
    });
    fixture = TestBed.createComponent(ActivityCreationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
