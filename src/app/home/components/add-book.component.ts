import { Book } from '../../models/books';
import { addBook } from '../../store/actions/books-actions';
import { AppState } from '../../state/app-state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html'
})
export class AddBookComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  onSubmit(submittedForm) {
    console.log(submittedForm.value);

    if (submittedForm.invalid) {
      return;
    }

    const book: Book = {id: uuid.v4(), title: submittedForm.value.title, author: submittedForm.value.author, description: submittedForm.value.description, published: submittedForm.value.published};
    this.store.dispatch(addBook({book}));

  }
}