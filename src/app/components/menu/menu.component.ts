import { Component, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments';
import { ConfigService, TickService } from '../../services';
import { EnvironmentKeys } from '../../constants';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  imports: [FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  private readonly configService = inject(ConfigService);

  private readonly tickService = inject(TickService);

  readonly appSettings = this.configService.config;

  readonly settings = [
    {
      title: 'Скорость',
      value: signal(this.configService.config().tick),
      key: EnvironmentKeys.tick,
    },
  ];

  setConfig<T extends keyof typeof environment>(
    key: keyof typeof environment,
    value: (typeof environment)[T],
  ): void {
    this.configService.setConfig({ [key]: value });
  }

  startGame(): void {
    this.tickService.start();
  }
}
