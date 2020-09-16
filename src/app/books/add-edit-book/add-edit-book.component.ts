import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Update } from '@ngrx/entity';
import { Book } from '../../models/book';
import { addBook, bookActionTypes, bookLoaded, loadBook } from '../store/actions/books-actions';
import { NgForm } from '@angular/forms';
import { getBookDetails } from '../store/selectors/books.selector';

@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.scss']
})

export class AddEditBookComponent implements OnInit {
  submitted = false;
  public book = new Book();
  showAdd = true;
  id: string;
  tempBook: Book[];

  constructor(private store: Store, private router: Router, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id'); // Get edit book id
    });

    if (this.id) {
      this.showAdd = false; // Hide Add Book button

      this.store.dispatch(loadBook({bookId: this.id}));
      this.store.select(getBookDetails).subscribe( response => {
        this.tempBook = response;
        this.book = {...this.tempBook[0]}; // Book details to be updated
      });
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
