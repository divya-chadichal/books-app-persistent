import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../models/books';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app-state';
import { Update } from '@ngrx/entity';
import { bookActionTypes, bookLoaded,  } from 'src/app/store/actions/books-actions';
import { ActivatedRoute, Router } from '@angular/router';
import { getBookDetails } from 'src/app/store/selectors/books.selector';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html'
})
export class EditBookComponent implements OnInit {

  public id;
  book$
  bookToBeUpdated;
  
  constructor(private store : Store<AppState>,  private route : ActivatedRoute, private router : Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });

    this.store.dispatch(bookActionTypes.loadBook({bookId: this.id}));
    this.book$ = this.store.select(getBookDetails);
    this.bookToBeUpdated = {...this.book$};
    console.log(this.bookToBeUpdated);

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

    this.bookToBeUpdated = null;
  }
}