import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../environments';

@Injectable({
  providedIn: 'root',
})
export class TickService {
  private readonly subject = new Subject<void>();

  public tick$ = this.subject.asObservable();

  private interval = environment.tick;

  private isTicksRunning = false;

  private tickRate = 1;

  private minimumTick = 30;

  private prevTimestamp = 0;

  get speed(): number {
    return Math.floor((1000 / this.interval) * 10);
  }

  runTicks(): void {
    if (this.isTicksRunning) {
      return;
    }

    requestAnimationFrame(this.rafCallback());
  }

  private rafCallback(): (timestam: number) => void {
    return (timestamp: number) => {
      if (timestamp - this.prevTimestamp >= this.interval) {
        this.subject.next();
        this.prevTimestamp = timestamp;
      }

      requestAnimationFrame(this.rafCallback());
    };
  }

  increaseSpeed(): void {
    if (this.interval <= this.minimumTick) {
      return;
    }
    this.interval = this.interval - this.tickRate;
  }
}
