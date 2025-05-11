import { environment } from '../environments';

export function getFruitImageUrl(fruitNumber: number) {
  return environment.imageFruitBase + fruitNumber + '.svg';
}
