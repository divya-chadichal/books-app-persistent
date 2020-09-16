import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BooksService } from './books.service';
import { Book } from 'src/app/models/book';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(BooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all books list', () => {
    return service.getBooks().toPromise().then( (result: any) => {
      expect(result);
    });
  });

  it('should update books', () => {
    const book: Book = {
      id: 1,
      title: 'Half of a Yellow Sun',
      author: 'Chimamanda Ngozi',
      description: 'With effortless grace, Chimamanda Ngozi Adichie illuminates a seminal moment in modern African history.',
      published: '4 January 1998'
    };
    return service.updateBook(1, book).toPromise().then( (result: any) => {
      expect(result);
    });
  });

});

