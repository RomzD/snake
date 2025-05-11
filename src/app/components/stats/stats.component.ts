import { Component, inject } from '@angular/core';
import {
  CollisionService,
  FruitService,
  StatisticsService,
  TickService,
} from '../../services';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ButtonComponent } from '../button';

@Component({
  selector: 'app-stats',
  imports: [ButtonComponent],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
})
export class StatsComponent {
  private readonly statisticsService = inject(StatisticsService);

  protected readonly collisionService = inject(CollisionService);

  protected readonly tickService = inject(TickService);

  readonly isCollided = toSignal(
    this.collisionService.isColided$.pipe(map(() => true)),
  );

  readonly fruitsByType = this.statisticsService.fruitsByType;

  readonly fruitsTotal = this.statisticsService.fruitsTotal;

  startAgain(): void {
    this.tickService.stop();
  }
}
