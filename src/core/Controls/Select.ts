import { Locator } from '@playwright/test';
import { BaseControl } from './BaseControl';

export class Select extends BaseControl {
  constructor(locator: Locator) {
    super(locator);
  }

  async SelectOption(option: string): Promise<string[]> {
    return await this.locator.selectOption(option);
  }
}
