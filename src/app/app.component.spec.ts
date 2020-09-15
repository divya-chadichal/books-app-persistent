import { fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './login/store/reducers/login-reducer';
import { registerReducer } from './register/store/reducers/register-reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './login/store/effects/login-effects';
import { RegisterEffects } from './register/store/effects/register-effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { Router, Routes } from '@angular/router';
import { Location } from '@angular/common';

describe('AppComponent', () => {
  let location: Location;
  let router: Router;
  let fixture: any;
  let app: any;


  const loginModule = () => import('./login/login.module').then(x => x.LoginModule);
  const registerModule = () => import('./register/register.module').then(x => x.RegisterModule);
  const booksModule = () => import('./books/books.module').then(x => x.BooksModule);

  const routes: Routes = [
    {
      path: 'login',
      loadChildren: loginModule
    },
    {
      path: 'register',
      loadChildren: registerModule
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
      path: 'home',
      loadChildren: booksModule
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
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
      declarations: [
        AppComponent,
        HeaderComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [AppComponent]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    router.initialNavigation();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('navigate to "" redirects you to /home', fakeAsync(() => {
    router.navigate(['']).then(() => {
      expect(location.path()).toBe('/home');
    });
  }));

});
