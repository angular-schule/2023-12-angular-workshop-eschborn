import { Component, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject, Observable, share, takeUntil, shareReplay } from 'rxjs';

import { MeasureValuesService } from './measure-values.service';
import { ExerciseService } from '../exercise.service';
import { HistoryComponent } from '../../shared/history/history.component';
import { NgFor, AsyncPipe, DecimalPipe, JsonPipe } from '@angular/common';

@Component({
  templateUrl: './multicast.component.html',
  standalone: true,
  imports: [NgFor, HistoryComponent, AsyncPipe, DecimalPipe, JsonPipe]
})
export class MulticastComponent implements OnDestroy {

  listeners: string[] = [];
  logStream$ = new ReplaySubject<string>();
  private destroy$ = new Subject<void>();

  measureValues$: Subject<number>; // später: Subject<number>;

  constructor(private mvs: MeasureValuesService, private es: ExerciseService) {
    /**************!!**************/

    // 1. unchanged stream (cold)
    // this.measureValues$ = this.mvs.getValues();

    // 2. mutilcasts (shares) the orginal observable
    // this.measureValues$ = this.mvs.getValues().pipe(share());

    // 3.
    // this.measureValues$ = this.mvs.getValues().pipe(shareReplay({
    //   refCount: true,
    //   bufferSize: 1
    // }));

    // 4. please try out:                                                        // REMOVE LINE
    // - Subject                                                                 // REMOVE LINE
    // - BehaviorSubject                                                         // REMOVE LINE
    // - ReplaySubject
    this.measureValues$ = new Subject<number>();                              // REMOVE LINE
    this.mvs.getValues().subscribe(this.measureValues$);

    /**************!!**************/

  }

  addListener() {
    this.listeners.push(this.es.generateRandomString());
  }

  addConsoleListener() {
    const randomString = this.es.generateRandomString();
    this.measureValues$.pipe(takeUntil(this.destroy$)).subscribe(e => this.logStream$.next(`${randomString} ${e}`));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}
