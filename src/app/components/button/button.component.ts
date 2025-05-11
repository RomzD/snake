import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  readonly onButtonClick = output<void>();

  readonly text = input('');

  emit(): void {
    this.onButtonClick.emit();
  }
}
