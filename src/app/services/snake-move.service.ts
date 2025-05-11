import { Injectable } from '@angular/core';
import { FieldBlock, MoveParams } from '../interfaces';
import { environment } from '../environments';

const EMPTY_FIELD_STATe = {
  isActive: false,
  head: false,
  isFruit: false,
  prev: -1,
};

@Injectable({
  providedIn: 'root',
})
export class SnakeMoveService {
  private readonly snake: FieldBlock[] = [
    {
      id: environment.startCell,
      head: true,
      isActive: true,
      prev: -1,
      isFruit: false,
    },
  ];

  get isSingleCell(): boolean {
    return this.snake.length === 1;
  }

  constructor() {}

  onMove(params: MoveParams): FieldBlock | null {
    const head = this.snake[this.snake.length - 1];
    const { fields, isPlaceFruite } = params;
    this.snake.push({
      ...head,
      id: params.nextCell,
      isFruit: false,
      prev: head.id,
    });

    head.head = false;

    if (!isPlaceFruite) {
      const snakeTail = this.snake.shift()!;
      const fieldRemoved = fields[snakeTail.id];
      const onCollitionTail = { ...fieldRemoved };
      fieldRemoved.isActive = false;
      fieldRemoved.head = false;
      fieldRemoved.isFruit = false;
      fieldRemoved.prev = -1;
      return onCollitionTail;
    }
    return null;
  }

  syncSnakeAndField(fields: FieldBlock[]): void {
    this.snake.forEach((segment) => {
      fields[segment.id] = { ...segment };
    });
  }

  isIntersectingWithSnake(snakeIndex: number): boolean {
    return !!this.snake.find(
      (segment) => segment.id === snakeIndex && !segment.head,
    );
  }
}
