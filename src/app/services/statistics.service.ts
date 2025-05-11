import { Injectable, signal } from '@angular/core';
import { getFruitImageUrl } from '../utils';

const FRUITS_COLLECTED_INIT: { value: number; image: string }[] = Array(10)
  .fill(null)
  .reduce((acc, item, i) => {
    acc[i] = {
      value: 0,
      image: getFruitImageUrl(i),
    };
    return acc;
  }, []);

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  readonly fruitsTotal = signal(0);

  readonly fruitsByType = signal([...FRUITS_COLLECTED_INIT]);

  constructor() {}

  plusFrutsTotal(): void {
    this.fruitsTotal.set(this.fruitsTotal() + 1);
  }

  plusFruitByType(index: number): void {
    this.fruitsByType()[index].value++;
    this.fruitsTotal.set(this.fruitsTotal() + 1);
  }

  resetState(): void {
    this.fruitsByType.set([...FRUITS_COLLECTED_INIT]);
    this.fruitsTotal.set(0);
  }
}
