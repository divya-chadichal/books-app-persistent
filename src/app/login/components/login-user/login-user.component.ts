import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { login } from '../../store/actions/login-actions';
import { authSelector } from '../../store/selectors/login-selector';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  error: any;
  loginResponse: any;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private store: Store
  ) { }

  ngOnInit(): void {
    // Build Login Form
      this.form = this.formBuilder.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  get f(): any { return this.form.controls; }

  // Login action function
  onSubmit(): void {
    this.submitted = true;
    const payload = { email: this.f.email.value, password: this.f.password.value};
    if (this.form.valid) {
      this.store.dispatch(login({ user: payload})); // Dispatch Login Action
      this.store.select(authSelector).subscribe(res =>  {
        this.loginResponse = res; // LoginSuccess or LoginFailure Response
        this.navigate(res); // call navigate
      });
    }
  }

  // Navigate/catch error
  navigate(response: any): void {
    if (response.loginToken) {
      localStorage.setItem('accessToken', response.loginToken);
      this.router.navigateByUrl('/home'); // If login success redirect to Home page
    } else {
        if (localStorage.getItem('accessToken')) {
          localStorage.removeItem('accessToken');
        }
        this.error = response.message; // capture error
    }
  }
}

