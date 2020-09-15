import { TestBed } from '@angular/core/testing';
import { RegisterUserComponent } from './register-user.component';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from '../../register-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { registerReducer } from '../../store/reducers/register-reducer';
import * as registerReducers from '../../store/reducers/register-reducer';
import { register } from '../../store/actions/register-actions';
import { RegisterUser } from '../../../models/register-user';

describe('RegisterUserComponent', () => {
  let component: any;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterUserComponent],
      imports: [
        CommonModule,
        RegisterRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [provideMockStore()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [RegisterUserComponent]
    });

    fixture = TestBed.createComponent(RegisterUserComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should return the default state', () => {
    const action = {} as any;

    const result = registerReducer(undefined, action);
    expect(result).toEqual(registerReducers.initialState);
  });

  describe('duplicate register  payload', () => {
    it('should NOT register a user', () => {
      const user = { firstname: 'divya', lastname: 'chadichal', email: 'dcjd@gmail.com', password: 'dcjd@123' } as RegisterUser;
      const createAction = register({user});
      const result = registerReducer(registerReducers.initialState, createAction);

      const expectedResult = {
        isRegistered: false,
        token : null,
        message: null,
        user: result.user
      };

      expect(result).toEqual(expectedResult);
    });
  });
});

