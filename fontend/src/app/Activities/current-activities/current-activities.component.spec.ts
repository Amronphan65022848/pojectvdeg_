import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentActivitiesComponent } from './current-activities.component';

describe('CurrentActivitiesComponent', () => {
  let component: CurrentActivitiesComponent;
  let fixture: ComponentFixture<CurrentActivitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentActivitiesComponent]
    });
    fixture = TestBed.createComponent(CurrentActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
