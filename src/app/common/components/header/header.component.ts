import { Component, OnInit } from '@angular/core';
import { logout } from 'src/app/store/actions/login-actions';
import { AppState } from 'src/app/state/app-state';
import { Store } from '@ngrx/store';
import { authSelector } from '../../../store/selectors/login-selector';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isLoggedIn;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(authSelector).subscribe(state => this.isLoggedIn = state.isAuthenticated);  
  }

  logout() {
    localStorage.removeItem('accessToken');
    window.location.reload();

  }

}
