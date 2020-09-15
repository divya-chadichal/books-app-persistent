import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../../models/login-user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient) { }

  // Login user call to json-server-auth
  loginUser(user: User): any {
    return this.http.post(environment.loginUrl, user)
    .pipe(map(data => {
        return data;
    }));
  }
}

