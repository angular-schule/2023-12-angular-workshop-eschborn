import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../shared/book';
import { NgIf, CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-book',
    standalone: true,
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss'],
    imports: [NgIf, CurrencyPipe],
    changeDetection: ChangeDetectionStrategy.OnPush // hier save!
})
export class BookComponent {

  @Input() book?: Book;

  @Output() rateUp = new EventEmitter<Book>();
  @Output() rateDown = new EventEmitter<Book>();

  doRateUp() {
    this.rateUp.emit(this.book);
  }

  doRateDown() {
    this.rateDown.emit(this.book);
  }

  log() {
    console.log(+new Date())
  }
}
