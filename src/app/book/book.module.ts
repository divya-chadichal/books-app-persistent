import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BookComponent } from './book.component';
import { BookRoutingModule } from './book-routing.module';
import { BookService } from '../core/services/book.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects } from './store/effects/books-effects';
import { bookReducer } from './store/reducers/books-reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookActionsComponent } from './components/book-actions.component';

@NgModule({
  declarations: [BookComponent, BookActionsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BookRoutingModule,
    StoreModule.forFeature('books', bookReducer),
    EffectsModule.forFeature([BookEffects])
  ],
  providers: [BookService],
  bootstrap: [],
  exports: [BookComponent, BookActionsComponent]
})

export class BookModule { }
