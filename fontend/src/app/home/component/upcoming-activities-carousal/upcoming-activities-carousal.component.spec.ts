import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingActivitiesCarousalComponent } from './upcoming-activities-carousal.component';

describe('UpcomingActivitiesCarousalComponent', () => {
  let component: UpcomingActivitiesCarousalComponent;
  let fixture: ComponentFixture<UpcomingActivitiesCarousalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingActivitiesCarousalComponent]
    });
    fixture = TestBed.createComponent(UpcomingActivitiesCarousalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
