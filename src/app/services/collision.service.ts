import { inject, Injectable } from '@angular/core';
import { environment } from '../environments';
import { Keys } from '../constants';
import { Subject } from 'rxjs';
import { SnakeMoveService } from './snake-move.service';

@Injectable({
  providedIn: 'root',
})
export class CollisionService {
  private readonly snakeMoveService = inject(SnakeMoveService);

  private readonly subject = new Subject<void>();

  private readonly cellSideCount = Math.sqrt(environment.cells);

  private sides = {
    left: Math.sqrt(environment.cells),
    right: new Array(this.cellSideCount)
      .fill(null)
      .map((cell, i) => i * this.cellSideCount - 1),
  };

  readonly isColided$ = this.subject.asObservable();

  constructor() {}

  private isCrashedWall(activeIndex: number, nextMove: number): boolean {
    const nextCell = activeIndex + nextMove;
    switch (nextMove) {
      case Keys.ArrowDown.value:
        return nextCell > environment.cells - 1;
      case Keys.ArrowUp.value:
        return nextCell < 0;
      case Keys.ArrowRight.value:
        return nextCell % this.sides.left === 0;
      case Keys.ArrowLeft.value:
        return this.sides.right.includes(nextCell);
    }
    return false;
  }

  isColidedSelf(newIndex: number): boolean {
    return this.snakeMoveService.isIntersectingWithSnake(newIndex);
  }

  isCollided(activeIndex: number, nextMove: number): boolean {
    const collided = this.isCrashedWall(activeIndex, nextMove);
    if (collided) {
      this.subject.next();
    }

    return collided;
  }
}
