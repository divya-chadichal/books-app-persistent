import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUserComponent } from './login-user.component';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from '../login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('LoginUserComponent', () => {
  let component: LoginUserComponent;
  let fixture: ComponentFixture<LoginUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginUserComponent ],
      imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
