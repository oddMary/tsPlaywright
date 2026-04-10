import { Locator } from '@playwright/test';

export abstract class BaseControl {
  protected readonly locator: Locator;

  constructor(locator: Locator) {
    this.locator = locator;
  }

  async click(): Promise<void> {
    await this.locator.click();
  }

  async fillText(text: string): Promise<void> {
    await this.locator.fill(text);
  }

  async getText(): Promise<string> {
    const text = await this.locator.innerText();
    return text?.trim() ?? '';
  }

  async scrollToCenterAndClick(): Promise<void> {
    try {
      await this.locator.scrollIntoViewIfNeeded();
      await this.click();
    } catch (error) {
      throw error;
    }
  }
}
