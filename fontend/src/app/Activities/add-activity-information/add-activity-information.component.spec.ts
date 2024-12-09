import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActivityInformationComponent } from './add-activity-information.component';

describe('AddActivityInformationComponent', () => {
  let component: AddActivityInformationComponent;
  let fixture: ComponentFixture<AddActivityInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddActivityInformationComponent]
    });
    fixture = TestBed.createComponent(AddActivityInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
