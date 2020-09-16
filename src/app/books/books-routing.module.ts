import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books.component';
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';
import { AuthGuardService } from '../core/services/authguard.service';

const routes: Routes = [
  { path: '', component: BooksComponent },
  { path: 'add-edit-book', component: AddEditBookComponent, canActivate: [AuthGuardService] },
  { path: 'add-edit-book/:id', component: AddEditBookComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BookRoutingModule { }
