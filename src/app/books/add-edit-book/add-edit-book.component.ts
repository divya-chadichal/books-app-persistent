import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Update } from '@ngrx/entity';
import { Book } from '../../models/book';
import { addBook, bookActionTypes } from '../store/actions/books-actions';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.css']
})

export class AddEditBookComponent implements OnInit {
  submitted = false;
  public book = new Book();
  showAdd = true;

  constructor(private store: Store, private router: Router) {
    if (!localStorage.getItem('accessToken')) {
      this.router.navigateByUrl('/login');
    }

    if (this.router.getCurrentNavigation().extras.state){
      this.showAdd = false;
      this.book = {...this.router.getCurrentNavigation().extras.state} as Book; // get book details to be updated
    }
  }

  ngOnInit(): void {}

  onSubmit(form: NgForm, type: string): void {
    this.submitted = true;

    if (form.valid) {
      if (type === 'add') {
        this.store.dispatch(addBook({book : this.book})); // dispatch add book action if type is add
      } else {
        if (type === 'edit') {
          // update book payload
          const update: Update<Book> = {
            id: this.book.id,
            changes: {
              ...this.book,
              ...form.value
            }
          };

          this.store.dispatch(bookActionTypes.updateBook({update})); // dispatch update book action if type is edit
        }
      }
    }
  }
}
