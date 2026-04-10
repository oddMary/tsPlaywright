import { Locator } from '@playwright/test';
import { BaseControl } from './BaseControl';

export class Link extends BaseControl {
  constructor(locator: Locator) {
    super(locator);
  }
}
