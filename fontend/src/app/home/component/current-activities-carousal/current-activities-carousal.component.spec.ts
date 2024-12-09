import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentActivitiesCarousalComponent } from './current-activities-carousal.component';

describe('CurrentActivitiesCarousalComponent', () => {
  let component: CurrentActivitiesCarousalComponent;
  let fixture: ComponentFixture<CurrentActivitiesCarousalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentActivitiesCarousalComponent]
    });
    fixture = TestBed.createComponent(CurrentActivitiesCarousalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
