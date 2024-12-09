import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginGuestComponent } from './login-guest.component';

describe('LoginGuestComponent', () => {
  let component: LoginGuestComponent;
  let fixture: ComponentFixture<LoginGuestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginGuestComponent]
    });
    fixture = TestBed.createComponent(LoginGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
