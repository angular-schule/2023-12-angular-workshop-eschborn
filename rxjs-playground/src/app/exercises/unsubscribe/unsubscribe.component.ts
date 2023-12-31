import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subject, ReplaySubject, timer, Subscription, takeWhile, takeUntil, map } from 'rxjs';
import { HistoryComponent } from '../../shared/history/history.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  templateUrl: './unsubscribe.component.html',
  standalone: true,
  imports: [HistoryComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnsubscribeComponent {

  interval$ = timer(0, 1000).pipe(
    map(x => x * 10)
  )

  interval$$ = toSignal(this.interval$)
}
