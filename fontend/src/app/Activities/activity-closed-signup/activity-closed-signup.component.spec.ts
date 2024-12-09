import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityClosedSignupComponent } from './activity-closed-signup.component';

describe('ActivityClosedSignupComponent', () => {
  let component: ActivityClosedSignupComponent;
  let fixture: ComponentFixture<ActivityClosedSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityClosedSignupComponent]
    });
    fixture = TestBed.createComponent(ActivityClosedSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
