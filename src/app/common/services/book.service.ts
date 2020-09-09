import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { Book } from "../../models/books";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})

export class BookService {

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(environment.booksUrl);
  }

  getBook(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${environment.booksUrl}/${bookId}`);
  }

  addBook(payload: Book): Observable<Book> {
    return this.http.post<Book>(environment.booksUrl, payload);
  }

  updateBook(bookId: string | number, changes : Partial<Book>): Observable<Book> {
    return this.http.put<Book>(`${environment.booksUrl}/${bookId}`, changes);
  }

  deleteBook(payload: number) {
    return this.http.delete(`${environment.booksUrl}/${payload}`);
  }
}
