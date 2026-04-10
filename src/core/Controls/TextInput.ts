import { Locator } from '@playwright/test';
import { BaseControl } from './BaseControl';
import { TestConstants } from '../constants/test-constants';

export class TextInput extends BaseControl {
  constructor(locator: Locator) {
    super(locator);
  }

  async setFormattedText(date: Date): Promise<void> {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());

    const formatted = `${year}-${month}-${day}`;
    await this.fillText(formatted);
  }
}
