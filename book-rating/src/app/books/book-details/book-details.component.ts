import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, concatMap, map, mergeMap, of, retry, switchMap } from 'rxjs';
import { BookStoreService } from '../shared/book-store.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterLink, NgIf],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {

  bookStore = inject(BookStoreService);

  book$ = inject(ActivatedRoute).paramMap.pipe(
    map(paramMap => paramMap.get('isbn') ?? ''),
    switchMap(isbn => this.bookStore.getSingleBook(isbn).pipe(
      retry({
        count: 3,
        delay: 500
      }),
      catchError((err: HttpErrorResponse) => of({
        isbn: '000',
        title: err.message,
        description: '',
        rating: 0,
        price: 0
      }))
    ))
  )

}
