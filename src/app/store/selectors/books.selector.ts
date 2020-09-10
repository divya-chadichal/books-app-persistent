import { BookState } from '../reducers/books-reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectAll } from '../reducers/books-reducer';

export const booksFeatureSelector = createFeatureSelector<BookState>('books');

export const getAllBooksList = createSelector(
  booksFeatureSelector,
  selectAll
);

export const getCurrentBookId = createSelector(
    booksFeatureSelector,
    (state: BookState) => state.selectedBookId
  );

export const getBookDetails = createSelector(
    booksFeatureSelector,
    getCurrentBookId,
    state => state.entities[state.selectedBookId]
);