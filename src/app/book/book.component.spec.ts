import { TestBed } from '@angular/core/testing';
import { BookComponent } from './book.component';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookRoutingModule } from './book-routing.module';
import { StoreModule } from '@ngrx/store';
import { bookReducer } from './store/reducers/books-reducer';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects } from './store/effects/books-effects';
import { BookActionsComponent } from './components/book-actions.component';
import { BookService } from '../core/services/book.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule  } from '@angular/router/testing';
import { RouterModule, Routes } from '@angular/router';

describe('BookComponent', () => {
  let fixture: any;
  let app: any;

  const routes: Routes = [
    { path: '', component: BookComponent },
    { path: 'book-actions', component: BookActionsComponent }
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookComponent, BookActionsComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BookRoutingModule,
        RouterTestingModule.withRoutes([{ path: '', component: BookComponent },
        { path: 'book-actions', component: BookActionsComponent }]),
        RouterModule.forChild(routes),
        StoreModule.forRoot({}),
        EffectsModule.forRoot(),
        StoreModule.forFeature('books', bookReducer),
        EffectsModule.forFeature([BookEffects])
      ],
      providers: [
        BookService,
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [BookComponent, BookActionsComponent],
      providers: [BookService]
    });

    fixture = TestBed.createComponent(BookComponent);
    app = fixture.componentInstance;
  });

  it('should create', () => {
    expect(app).toBeTruthy();
  });

  /*it('should navigate to book-actions page if clicked Add Book button', () => {
    const fixture = TestBed.createComponent(BookComponent);
    const location = TestBed.call(Location);

    const addBook = fixture.debugElement.query(By.css('#addBook'));
    addBook.triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();

    expect(location.path()).toBe('/home/book-actions');
  });*/

});

