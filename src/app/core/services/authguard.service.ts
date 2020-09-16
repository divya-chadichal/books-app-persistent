import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

    public token: string;

    constructor(private router: Router) {
      this.token = localStorage.getItem('accessToken');
    }

    canActivate(): any  {
      if (!this.token) {
        this.router.navigateByUrl('/login');
      }
      return true;
    }
}
