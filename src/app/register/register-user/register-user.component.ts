import { Component, OnInit } from '@angular/core';
import { RegisterUser } from 'src/app/models/register-user';
import { Store } from '@ngrx/store';
import * as RegisterActions from '../../store/actions/register-actions'
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { register } from '../../store/actions/register-actions';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  user: RegisterUser = new RegisterUser();
  public registerResponse;
  error : string;

  constructor(private store : Store, private router : Router, private formBuilder : FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    this.submitted = true;
    var payload = { firstname: this.f.firstname.value, lastname: this.f.lastname.value, email: this.f.email.value, password: this.f.password.value};
    if(this.form.valid) {
    this.store.dispatch(RegisterActions.register({ user: payload}));
    this.store.select(register).subscribe( response => {
      this.registerResponse = response;
      if(this.registerResponse.register.token) this.navigate();
      else if(this.registerResponse.register.message) this.error = this.registerResponse.register.message.error;
    }
    );
   }
  }

  navigate() {
    this.router.navigateByUrl('/login');
  }
}
