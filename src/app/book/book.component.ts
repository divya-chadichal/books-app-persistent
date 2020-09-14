import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/books';
import { Store } from '@ngrx/store';
import { getAllBooksList } from './store/selectors/books.selector';
import { bookActionTypes } from './store/actions/books-actions';
import { authSelector } from '../login/store/selectors/login-selector';

@Component({
  selector: 'app-home',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})

export class BookComponent implements OnInit {
  books$: Observable<Book[]>;
  isLoggedIn: boolean;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(bookActionTypes.loadBooks()); // dispatch load books actions
    this.books$ = this.store.select(getAllBooksList); // get all books list
    this.store.select(authSelector).subscribe(state => this.isLoggedIn = state.isAuthenticated); // set isLoggedIn to true if logged in
  }

  // Delete Book function
  deleteBook(bookId: number): void {
    this.store.dispatch(bookActionTypes.deleteBook({bookId}));// dispatch delete book action
  }

}
