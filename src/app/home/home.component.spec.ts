import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { StoreModule } from '@ngrx/store';
import { bookReducer } from '../store/reducers/books-reducer';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects } from '../store/effects/books-effects';
import { AddBookComponent } from './components/add-book.component';
import { EditBookComponent } from './components/edit-book.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent, AddBookComponent, EditBookComponent ],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HomeRoutingModule,
        StoreModule.forFeature('books', bookReducer),
        EffectsModule.forFeature([BookEffects])
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
