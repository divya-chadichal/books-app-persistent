import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RegisterUser } from '../../models/register-user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  constructor(private http: HttpClient) { }

  // Register User call to json-server-auth
  registerUser(user: RegisterUser): any {
    return this.http.post(environment.registerUrl, user)
    .pipe(map(data => {
        return data;
    }));
  }
}
