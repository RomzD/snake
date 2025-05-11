import { inject, Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class TickService {
  private readonly configService = inject(ConfigService);

  private readonly subject = new Subject<void>();

  public tick$ = this.subject.asObservable();

  private interval = this.configService.config().tick;

  private isTicksRunning = false;

  private tickRate = 1;

  private minimumTick = 30;

  private prevTimestamp = 0;

  readonly isStarted = signal(false);

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
    if (
      !this.configService.config().increaseSpeedRate ||
      this.interval <= this.minimumTick
    ) {
      return;
    }
    this.interval = this.interval - this.tickRate;
  }

  start(): void {
    this.setTickInterval(this.configService.config().tick);
    this.isStarted.set(true);
  }

  stop(): void {
    this.isStarted.set(false);
  }

  setTickInterval(speed: number): void {
    this.interval = Math.round(1000 / speed) * 10;
  }
}
