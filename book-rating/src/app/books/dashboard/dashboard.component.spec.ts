import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { DashboardComponent } from './dashboard.component';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgFor } from '@angular/common';
import { BookComponent } from '../book/book.component';


@Component({
  selector: 'app-book',
  standalone: true,
  template: 'TEST'
})
export class DummyBookComponent {
  @Input() book?: Book;
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {

    const bookRatingMock = {
      rateUp: (book: Book) => book
      // rateDown nicht!
    };

    await TestBed.configureTestingModule({
    imports: [DashboardComponent],
    providers: [{
        provide: BookRatingService,
        useValue: bookRatingMock
    }]
    })
    // .overrideComponent(DashboardComponent, {
    //   set: { imports: [], schemas: [NO_ERRORS_SCHEMA] }
    // })
    // .overrideComponent(DashboardComponent, {
    //   remove: { imports: [BookComponent] },
    //   add: { imports: [DummyBookComponent] }
    // })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('doRateUp() should call the BookRatingService', () => {

    const rs = TestBed.inject(BookRatingService);
    spyOn(rs, 'rateUp').and.callThrough();

    const book = {} as Book;
    component.doRateUp(book);

    expect(rs.rateUp).toHaveBeenCalledOnceWith(book);
  });
});
