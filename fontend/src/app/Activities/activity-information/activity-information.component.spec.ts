import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityInformationComponent } from './activity-information.component';

describe('ActivityInformationComponent', () => {
  let component: ActivityInformationComponent;
  let fixture: ComponentFixture<ActivityInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityInformationComponent]
    });
    fixture = TestBed.createComponent(ActivityInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
