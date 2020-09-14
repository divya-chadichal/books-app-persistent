import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../../models/books';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BookService {

  constructor(private http: HttpClient) {}

  // Get all books list call to json-server
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(environment.booksUrl);
  }

  // Add book call to json-server
  addBook(payload: Book): Observable<Book> {
    return this.http.post<Book>(environment.booksUrl, payload);
  }

  // Update book call to json-srver
  updateBook(bookId: string | number, changes: Partial<Book>): Observable<Book> {
    return this.http.put<Book>(`${environment.booksUrl}/${bookId}`, changes);
  }

  // Delete book call to json-server
  deleteBook(payload: number): any {
    return this.http.delete(`${environment.booksUrl}/${payload}`);
  }
}
