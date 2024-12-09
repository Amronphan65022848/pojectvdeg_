import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySignupListComponent } from './activity-signup-list.component';

describe('ActivitySignupListComponent', () => {
  let component: ActivitySignupListComponent;
  let fixture: ComponentFixture<ActivitySignupListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivitySignupListComponent]
    });
    fixture = TestBed.createComponent(ActivitySignupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
