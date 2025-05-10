import { FieldBlock } from './field-block.interface';

export interface MoveParams {
  fields: FieldBlock[];
  isPlaceFruite: boolean;
  nextCell: number;
}
