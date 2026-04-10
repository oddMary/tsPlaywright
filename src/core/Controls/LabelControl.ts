import { Locator } from '@playwright/test';
import { BaseControl } from './BaseControl';

export class LabelControl extends BaseControl {
  constructor(locator: Locator) {
    super(locator);
  }

  async getList(): Promise<LabelControl[]> {
    await this.locator.waitFor({
      state: 'attached',
    });

    const countFinal = await this.locator.count();
    const list: LabelControl[] = [];

    for (let i = 0; i < countFinal; i++) {
      list.push(new LabelControl(this.locator.nth(i)));
    }

    return list;
  }
}
