import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from './book.component';
import { BookActionsComponent } from './components/book-actions.component';

const routes: Routes = [
  { path: '', component: BookComponent },
  { path: 'book-actions', component: BookActionsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BookRoutingModule { }
