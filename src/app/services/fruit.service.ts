import { inject, Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { FieldBlock } from '../interfaces';
import { getFruitImageUrl } from '../utils';
import { StatisticsService } from './statistics.service';

@Injectable({
  providedIn: 'root',
})
export class FruitService {
  private readonly configService = inject(ConfigService);

  private readonly statisticsService = inject(StatisticsService);

  private fruitIndex = -1;

  private fruitImageNumber = 1;

  get fruitImage(): string {
    return getFruitImageUrl(this.fruitImageNumber);
  }

  constructor() {}

  private checkFruitIndex(
    fields: FieldBlock[],
    isPlaceFruite = false,
  ): number | null {
    if (!isPlaceFruite && this.fruitIndex !== -1) {
      return null;
    }

    const fruitPlaces = fields.filter((field) => !field.isActive);
    const fruitIndex = Math.round(Math.random() * (fruitPlaces.length - 1));
    try {
      const fruitPlace = fruitPlaces[fruitIndex]?.id;
      return fruitPlace;
    } catch (e) {
      console.log('FRUITERROR => ', fruitIndex, [...fruitPlaces]);
      throw new Error('STOP EXCEPTION');
    }
  }

  placeFruit(fields: FieldBlock[], isPlaceFruite = false): boolean {
    const fruitIndex = this.checkFruitIndex(fields, isPlaceFruite);
    if (fruitIndex) {
      this.randomizeFruit();
      this.fruitIndex = fruitIndex;

      if (fields[fruitIndex].isActive) {
        const newFruitIndex = fields.find((cell) => !cell.isActive)!.id;
        this.fruitIndex = newFruitIndex;
        fields[newFruitIndex].isFruit = true;
        return true;
      }
      fields[fruitIndex].isFruit = true;
      return true;
    } else {
      return false;
    }
  }

  private randomizeFruit(): void {
    if (this.fruitIndex !== -1) {
      this.statisticsService.plusFruitByType(this.fruitImageNumber);
    }

    const fruitImageNumber = Math.round(Math.random() * 10);
    this.fruitImageNumber =
      fruitImageNumber < 0
        ? 0
        : fruitImageNumber >= this.configService.config().fruitAmount
          ? this.configService.config().fruitAmount - 1
          : fruitImageNumber;
  }
}
