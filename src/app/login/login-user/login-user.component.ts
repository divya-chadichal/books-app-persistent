import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from 'src/app/store/actions/login-actions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { authSelector } from 'src/app/store/selectors/login-selector';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  error;
  loginResponse;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private store: Store
  ) { }

  ngOnInit() {
      this.form = this.formBuilder.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    var payload = { email: this.f.email.value, password: this.f.password.value};
    if(this.form.valid) {
      this.store.dispatch(login({ user: payload}));
      this.store.select(authSelector).subscribe(res =>  {
        this.loginResponse = res;
        this.navigate(res)
      });
    }
  }

  navigate(response){
    if(response.loginToken){
      localStorage.setItem('accessToken', response.loginToken);
      this.router.navigateByUrl('/home'); 
    } 
      else {
        if(localStorage.getItem('accessToken')) localStorage.removeItem('accessToken');
        this.error = response.message;
      }
  }
}
