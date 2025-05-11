import {
  afterNextRender,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
} from '@angular/core';
import { BlockComponent } from '../block';
import {
  CollisionService,
  ConfigService,
  FruitService,
  SnakeMoveService,
  TickService,
} from '../../services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, interval, take, takeUntil, tap, timer } from 'rxjs';
import { KeydownService } from '../../services/keydown.service';
import { NgClass } from '@angular/common';
import { FieldBlock } from '../../interfaces';

@Component({
  selector: 'app-field',
  imports: [BlockComponent, NgClass],
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss',
})
export class FieldComponent {
  private readonly cdr = inject(ChangeDetectorRef);

  private readonly configService = inject(ConfigService);

  private readonly tickService = inject(TickService);

  protected readonly keydownService = inject(KeydownService);

  private readonly collisionService = inject(CollisionService);

  protected readonly fruitService = inject(FruitService);

  private readonly snakeMoveService = inject(SnakeMoveService);

  private readonly initHeadPos = this.configService.config().startCell;

  private readonly arrayCount = this.configService.config().cells;

  private nextMove = 1;

  readonly dimension = Math.sqrt(this.configService.config().cells);

  readonly countDown = signal(3);

  isCollided = false;

  readonly fields: FieldBlock[] = new Array(this.arrayCount)
    .fill(null)
    .map((item, i) => {
      return {
        id: i,
        head: i === this.initHeadPos,
        isActive: i === this.initHeadPos,
        prev: -1,
        isFruit: false,
      };
    });

  constructor() {
    afterNextRender(() => {
      interval(1000)
        .pipe(
          take(this.countDown()),
          tap(() => {
            this.countDown.set(this.countDown() - 1);
            if (this.countDown()) {
              return;
            }
            this.tickService.runTicks();
          }),
        )
        .subscribe();
    });

    this.keydownService.listener.pipe(takeUntilDestroyed()).subscribe();

    this.keydownService.nextMove$
      .pipe(
        tap((move: number) => {
          this.nextMove = move;
        }),
      )
      .subscribe();

    this.tickService.tick$
      .pipe(
        takeUntilDestroyed(),
        takeUntil(this.collisionService.isColided$),
        filter(() => !this.isCollided),
        tap(() => {
          this.keydownService.setDirection(this.nextMove);
          const head = this.fields.findIndex((i) => i.head);
          const nextCell = head + this.nextMove;
          this.isCollided = this.collisionService.isCollided(
            head,
            this.nextMove,
          );
          if (this.isCollided) {
            this.cdr.detectChanges();
            this.cdr.detach();
            return;
          }

          const isPlaceFruit = this.fields[head + this.nextMove].isFruit;
          this.snakeMoveService.onMove({
            fields: this.fields,
            isPlaceFruite: isPlaceFruit,
            nextCell: head + this.nextMove,
          });

          this.isCollided = this.collisionService.isColidedSelf(nextCell);
          if (this.isCollided) {
            return;
          }

          if (this.fruitService.placeFruit(this.fields, isPlaceFruit)) {
            this.tickService.increaseSpeed();
          }
          this.cdr.detectChanges();
        }),
      )
      .subscribe();
  }
}
