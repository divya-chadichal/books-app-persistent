import { bookActionTypes } from '../actions/books-actions';
import { BookService } from '../../common/services/book.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class BookEffects {

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActionTypes.loadBooks),
      concatMap(() => this.bookService.getBooks()),
      map(books => bookActionTypes.booksLoaded({books}))
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActionTypes.addBook),
      concatMap((action) => this.bookService.addBook(action.book)),
      tap(() => this.router.navigateByUrl('/home'))
    ),
    {dispatch: false}
  );

  deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActionTypes.deleteBook),
      concatMap((action) => this.bookService.deleteBook(action.bookId))
    ),
    {dispatch: false}
  );

  loadBook$ = createEffect(() =>
    this.actions$.pipe(
    ofType(bookActionTypes.loadBook),
    concatMap((action) => this.bookService.getBook(action.bookId)),
    map(book => bookActionTypes.bookLoaded({book}))
  )
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActionTypes.updateBook),
      concatMap((action) => this.bookService.updateBook(action.update.id, action.update.changes))
    ),
    {dispatch: false}
  );

  constructor(private bookService: BookService, private actions$: Actions, private router: Router) {}
}