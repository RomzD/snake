import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, fromEvent, tap } from 'rxjs';
import { Keys } from '../constants';
import { SnakeMoveService } from './snake-move.service';
import { Orientation } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class KeydownService {
  private readonly document = inject(DOCUMENT);

  private readonly snakeMoveService = inject(SnakeMoveService);

  private readonly subject = new BehaviorSubject<number>(Keys.ArrowRight.value);

  private currentDirection = Keys.ArrowRight.value;

  get orientation(): Orientation {
    switch (this.currentDirection) {
      case Keys.ArrowDown.value:
        return Orientation.Down;
      case Keys.ArrowUp.value:
        return Orientation.Up;
      case Keys.ArrowLeft.value:
        return Orientation.Left;
      default:
        return Orientation.Right;
    }
  }

  readonly listener = fromEvent<KeyboardEvent>(this.document, 'keydown').pipe(
    filter(
      (event) =>
        Object.keys(Keys).includes(event.key) &&
        this.isAllowedMove(event.key as keyof typeof Keys),
    ),
    tap((event) => {
      const key = event.key as keyof typeof Keys;
      this.subject.next(Keys[key].value);
    }),
  );

  nextMove$ = this.subject.asObservable();

  constructor() {}

  private isAllowedMove(key: keyof typeof Keys): boolean {
    if (this.snakeMoveService.isSingleCell) {
      return true;
    }
    switch (key) {
      case 'ArrowDown':
        return this.currentDirection !== Keys.ArrowUp.value;
      case 'ArrowUp':
        return this.currentDirection !== Keys.ArrowDown.value;
      case 'ArrowLeft':
        return this.currentDirection !== Keys.ArrowRight.value;
      case 'ArrowRight':
        return this.currentDirection !== Keys.ArrowLeft.value;
    }
  }

  setDirection(direction: number): void {
    this.currentDirection = direction;
  }
}
