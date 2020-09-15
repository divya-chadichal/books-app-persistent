import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BooksComponent } from './books.component';
import { BookRoutingModule } from './books-routing.module';
import { BooksService } from '../core/services/books.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects } from './store/effects/books-effects';
import { bookReducer } from './store/reducers/books-reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';

@NgModule({
  declarations: [BooksComponent, AddEditBookComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BookRoutingModule,
    StoreModule.forFeature('books', bookReducer),
    EffectsModule.forFeature([BookEffects])
  ],
  providers: [BooksService],
  bootstrap: [],
  exports: [BooksComponent, AddEditBookComponent]
})

export class BooksModule { }
