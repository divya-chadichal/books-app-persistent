import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/books';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app-state';
import { getAllBooksList } from '../store/selectors/books.selector';
import { bookActionTypes } from '../store/actions/books-actions';
import { Update } from '@ngrx/entity';
import { authSelector } from '../store/selectors/login-selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books$: Observable<Book[]>;
  bookToBeUpdated: Book;
  isUpdateActivated = false;
  isLoggedIn: boolean;
  
  constructor(private store : Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(bookActionTypes.loadBooks());
    this.books$ = this.store.select(getAllBooksList);
    this.store.select(authSelector).subscribe(state => this.isLoggedIn = state.isAuthenticated);  
  }

  showUpdateForm(book: Book) {
    this.bookToBeUpdated = {...book};
    this.isUpdateActivated = true;
  }

  updateBook(updateForm) {
    const update: Update<Book> = {
      id: this.bookToBeUpdated.id,
      changes: {
        ...this.bookToBeUpdated,
        ...updateForm.value
      }
    };

    this.store.dispatch(bookActionTypes.updateBook({update}));

    this.isUpdateActivated = false;
    this.bookToBeUpdated = null;
  }

  deleteBook(bookId: number) {
    this.store.dispatch(bookActionTypes.deleteBook({bookId}));
  }
  
}
