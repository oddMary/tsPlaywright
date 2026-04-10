import { Locator } from '@playwright/test';
import { BaseControl } from './BaseControl';

export class Button extends BaseControl {
  constructor(locator: Locator) {
    super(locator);
  }
}
