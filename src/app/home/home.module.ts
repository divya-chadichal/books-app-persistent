import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { BookService } from '../common/services/book.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects } from '../store/effects/books-effects';
import { bookReducer } from '../store/reducers/books-reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBookComponent } from './components/add-book.component';
import { EditBookComponent } from './components/edit-book.component';

@NgModule({
  declarations: [HomeComponent, AddBookComponent, EditBookComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    StoreModule.forFeature('books', bookReducer),
    EffectsModule.forFeature([BookEffects])
  ],
  providers: [BookService],
  bootstrap: [],
  exports: [AddBookComponent, EditBookComponent]
})

export class HomeModule { }