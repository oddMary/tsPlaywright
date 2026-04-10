import { Locator } from '@playwright/test';
import { BaseControl } from './BaseControl';

export class Checkbox extends BaseControl {
  constructor(locator: Locator) {
    super(locator);
  }

  async isSelected(): Promise<boolean> {
    return await this.locator.isChecked();
  }
}
