import { Injectable } from '@angular/core';
import { RegisterUser } from 'src/app/models/register-user';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  constructor(private http : HttpClient) { }

  registerUser(user : RegisterUser) {
    return this.http.post(environment.registerUrl, user)
    .pipe(map(data => {
        return data;
    }));
  }
}
