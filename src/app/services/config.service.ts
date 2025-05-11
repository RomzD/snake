import { Injectable, signal } from '@angular/core';
import { environment } from '../environments';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly environmentConfig = signal({ ...environment });

  get config() {
    return this.environmentConfig;
  }

  setConfig(config: Partial<typeof environment>): void {
    this.environmentConfig.set({ ...this.environmentConfig(), ...config });
  }
}
