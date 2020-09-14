import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import { Router } from '@angular/router';
import { Update } from '@ngrx/entity';
import { Book } from '../../models/books';
import { addBook, bookActionTypes } from '../store/actions/books-actions';

@Component({
  selector: 'app-book-actions',
  templateUrl: './book-actions.component.html',
  styleUrls: ['./book-actions.component.css']
})

export class BookActionsComponent implements OnInit {
  submitted = false;
  book = new Book();
  showAdd = true;

  constructor(private store: Store, private router: Router) {
    if( this.router.getCurrentNavigation().extras.state ){
      this.showAdd = false;
      this.book = this.router.getCurrentNavigation().extras.state as Book; // get book details to be updated
    }
  }

  ngOnInit(): void {}

  onSubmit(form, type): void {
    this.submitted = true;

    if( form.valid ) {
      if(type === 'add') {
        this.book.id = uuid.v4();
        this.store.dispatch(addBook({book : this.book})); // dispatch add book action if type is add
      } else {
        if(type === 'edit') {
          // update book payload
          const update: Update<Book> = {
            id: this.book.id,
            changes: {
              ...this.book,
              ...form.value
            }
          };

          this.store.dispatch(bookActionTypes.updateBook({update})); // dispatch update book action if type is edit
          this.router.navigateByUrl('/home');
        }
      }
    }
  }
}
