import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FieldComponent } from './components/field/field.component';
import { StatsComponent } from './components/stats/stats.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FieldComponent, StatsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'snake';
}
