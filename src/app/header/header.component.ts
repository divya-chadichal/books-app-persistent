import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { authSelector } from '../login/store/selectors/login-selector';
import { ThemeService } from '../core/services/theme.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  darkTheme = new FormControl(false);

  constructor(private store: Store, private themeService: ThemeService) {}

  ngOnInit(): void {
    // Set isLoggedIn depending if user is authenticated
    this.store.select(authSelector).subscribe(state => this.isLoggedIn = state.isAuthenticated);
  }

  // Toggle theme dark/light
  onSetTheme(): void {
    this.darkTheme.valueChanges.subscribe(value => {
      if (value) {
        this.themeService.toggleDark();
      } else {
        this.themeService.toggleLight();
      }
    });

  }

  logout(): void {
    localStorage.removeItem('accessToken');
    window.location.reload();
  }

}
