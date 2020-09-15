import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BookState } from '../reducers/books-reducer';
import { selectAll } from '../reducers/books-reducer';

export const booksFeatureSelector = createFeatureSelector<BookState>('books');

// Get all books list
export const getAllBooksList = createSelector(
  booksFeatureSelector,
  selectAll
);

// Get id of current book
export const getCurrentBookId = createSelector(
    booksFeatureSelector,
    (state: BookState) => state.selectedBookId
);
