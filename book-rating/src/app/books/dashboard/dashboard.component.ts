import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';

import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookComponent } from '../book/book.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [NgFor, BookComponent, NgIf],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  books: Book[] = [];

  rs = inject(BookRatingService);

  constructor(/*cd: ChangeDetectorRef*/) {
    this.books = [
      {
        isbn: '123',
        title: 'Angular',
        description: 'Grundlagen und mehr',
        price: 36.9,
        rating: 5
      },
      {
        isbn: '456',
        title: 'Vue.js',
        description: 'Das grüne Framework',
        price: 32.9,
        rating: 3
      },
      {
        isbn: '112',
        title: 'jQuery',
        description: 'Alt!!!',
        price: 1,
        rating: 1
      }
    ];

    setTimeout(() => {
      this.books = [];
      // cd.detectChanges();
    }, 3000);
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
}
