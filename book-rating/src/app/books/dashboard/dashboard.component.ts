import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';

import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookComponent } from '../book/book.component';
import { BookCreateComponent } from '../book-create/book-create.component';
import { BookStoreService } from '../shared/book-store.service';


@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [BookComponent, BookCreateComponent],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  books: Book[] = [];

  rs = inject(BookRatingService);
  bs = inject(BookStoreService);

  constructor() {
    this.bs.getAllBooks().subscribe(books => this.books = books);
  }

  doRateUp(book: Book) {
    // const ratedBook = this.rs.rateUp(book);
    const ratedBook = {
      ...book,
      rating: book.rating >= 5 ? 5: book.rating + 1
    }
    this.updateAndSortList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.rs.rateDown(book);
    this.updateAndSortList(ratedBook);
  }
  updateAndSortList(ratedBook: Book) {
    this.books = this.books
      .map(b => b.isbn === ratedBook.isbn ? ratedBook : b)
      .sort((a, b) => b.rating - a.rating);
  }


  addBook(newBook: Book): void {
    this.books = [...this.books, newBook]
  }
}
