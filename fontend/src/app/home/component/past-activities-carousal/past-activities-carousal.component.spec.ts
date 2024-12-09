import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastActivitiesCarousalComponent } from './past-activities-carousal.component';

describe('PastActivitiesCarousalComponent', () => {
  let component: PastActivitiesCarousalComponent;
  let fixture: ComponentFixture<PastActivitiesCarousalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PastActivitiesCarousalComponent]
    });
    fixture = TestBed.createComponent(PastActivitiesCarousalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
