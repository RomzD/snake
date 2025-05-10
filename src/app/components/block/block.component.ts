import { NgClass } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FieldBlock } from '../../interfaces';

@Component({
  selector: 'app-block',
  imports: [NgClass],
  templateUrl: './block.component.html',
  styleUrl: './block.component.scss',
  standalone: true,
})
export class BlockComponent {
  readonly block = input.required<FieldBlock>();

  readonly orientation = input('');

  readonly fruitImage = input('');
}
