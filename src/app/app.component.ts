import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TickService } from './services';
import { FieldComponent, MenuComponent, StatsComponent } from './components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FieldComponent, MenuComponent, StatsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly tickService = inject(TickService);

  title = 'snake';
}
