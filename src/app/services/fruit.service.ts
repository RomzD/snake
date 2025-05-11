import { inject, Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { FieldBlock } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class FruitService {
  private readonly configService = inject(ConfigService);

  private fruitIndex = -1;

  private applesCollected = -1;

  private fruitImageNumber = 1;

  get fruitImage(): string {
    return (
      this.configService.config().imageFruitBase +
      this.fruitImageNumber +
      '.svg'
    );
  }

  get applesAmount(): number {
    return this.applesCollected;
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
      this.fruitIndex = fruitIndex;
      this.applesCollected++;
      this.randomizeFruit();

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
    const fruitImageNumber = Math.round(Math.random() * 10);
    this.fruitImageNumber =
      fruitImageNumber < 1 ||
      fruitImageNumber > this.configService.config().fruitAmount
        ? 1
        : fruitImageNumber;
  }
}
