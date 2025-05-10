import { Component, inject } from '@angular/core';
import { FruitService, TickService } from '../../services';

@Component({
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
})
export class StatsComponent {
  protected readonly fruitService = inject(FruitService);

  protected readonly tickService = inject(TickService);
}
