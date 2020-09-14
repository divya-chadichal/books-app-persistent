import { Injectable } from '@angular/core';

// Dark theme properties
export const darkTheme = {
  'primary-color': '#484848',
  'background-color': '#B0B0B0',
  'text-color': 'white'
};

// Light theme properties
export const lightTheme = {
  'primary-color': '#E74C3C',
  'background-color': 'white',
  'text-color': 'white'
};

@Injectable({ providedIn: 'root' })
export class ThemeService {
  // Set dark theme
  toggleDark(): void {
    this.setTheme(darkTheme);
  }

  // set light theme
  toggleLight(): void {
    this.setTheme(lightTheme);
  }

  // set properties of root variables
  private setTheme(theme: {}): void {
    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
  }
}

