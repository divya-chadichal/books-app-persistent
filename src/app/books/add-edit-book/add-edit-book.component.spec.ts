import { TestBed } from '@angular/core/testing';
import { BooksComponent } from '../books.component';
import { APP_BASE_HREF, CommonModule, Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookRoutingModule } from '../books-routing.module';
import { StoreModule } from '@ngrx/store';
import { bookReducer } from '../store/reducers/books-reducer';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects } from '../store/effects/books-effects';
import { AddEditBookComponent } from '../add-edit-book/add-edit-book.component';
import { BooksService } from '../../core/services/books.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule  } from '@angular/router/testing';
import { Router, RouterModule, Routes } from '@angular/router';
import { UserEffects } from '../../login/store/effects/login-effects';
import { userReducer } from '../../login/store/reducers/login-reducer';
import { RegisterEffects } from '../../register/store/effects/register-effects';
import { registerReducer } from '../../register/store/reducers/register-reducer';

describe('BookComponent', () => {
  let fixture: any;
  let app: any;
  let location: Location;
  let router: Router;

  const routes: Routes = [
    { path: '', component: BooksComponent },
    { path: 'book-actions', component: AddEditBookComponent }
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooksComponent, AddEditBookComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BookRoutingModule,
        RouterTestingModule.withRoutes([{ path: '', component: BooksComponent },
        { path: 'book-actions', component: AddEditBookComponent }]),
        RouterModule.forChild(routes),
        StoreModule.forRoot({user: userReducer, register: registerReducer}),
        EffectsModule.forRoot([UserEffects, RegisterEffects]),
        StoreModule.forFeature('books', bookReducer),
        EffectsModule.forFeature([BookEffects])
      ],
      providers: [
        BooksService,
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [BooksComponent, AddEditBookComponent],
      providers: [BooksService]
    });

    fixture = TestBed.createComponent(AddEditBookComponent);
    app = fixture.componentInstance;

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should create', () => {
    expect(app).toBeTruthy();
  });

});


