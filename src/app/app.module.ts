import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { registerReducer } from './register/store/reducers/register-reducer';
import { RegisterEffects } from './register/store/effects/register-effects';
import { UserEffects } from './login/store/effects/login-effects';
import { userReducer } from './login/store/reducers/login-reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeService } from './core/services/theme.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({user: userReducer, register: registerReducer}),
    EffectsModule.forRoot([UserEffects, RegisterEffects]),
    BrowserAnimationsModule
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
