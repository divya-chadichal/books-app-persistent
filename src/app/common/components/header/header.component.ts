import { Component, OnInit, HostBinding } from '@angular/core';
import { AppState } from 'src/app/state/app-state';
import { Store } from '@ngrx/store';
import { authSelector } from '../../../store/selectors/login-selector';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isLoggedIn;

  constructor(private store: Store<AppState>, public overlay: OverlayContainer) {}

  @HostBinding('class') componentCssClass;
  
  ngOnInit() {
    this.store.select(authSelector).subscribe(state => this.isLoggedIn = state.isAuthenticated);  
  }

  onSetTheme() {
      var element = document.body;
      var header =  document.getElementById("headerSection");
      element.classList.toggle("dark-mode");
      header.classList.toggle("dark-mode-header");
    }

  logout() {
    localStorage.removeItem('accessToken');
    window.location.reload();
  }

}
