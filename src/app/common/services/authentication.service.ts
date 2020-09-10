import { Injectable } from '@angular/core';
import { User } from 'src/app/models/login-user';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private http : HttpClient) { }

  loginUser(user : User) {
    return this.http.post(environment.loginUrl, user)
    .pipe(map(data => {
        return data;
    }));
  }
}
