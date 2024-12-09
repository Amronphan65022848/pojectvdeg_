import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySignupFinComponent } from './activity-signup-fin.component';

describe('ActivitySignupFinComponent', () => {
  let component: ActivitySignupFinComponent;
  let fixture: ComponentFixture<ActivitySignupFinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivitySignupFinComponent]
    });
    fixture = TestBed.createComponent(ActivitySignupFinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
