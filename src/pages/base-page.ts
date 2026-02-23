import { Page, BrowserContext } from 'playwright';
import { expect } from '@playwright/test';
import { join } from 'path';
import config from '../config';

export class BasePage {
  constructor(public page: Page, public context: BrowserContext) {}

  async goto(url?: string): Promise<void> {
    await this.page.goto(url || config.baseUrl);
    // Accept cookies if banner present
    try {
      await this.page.click('button:has-text("Accept additional cookies")', { timeout: 5000 });
    } catch {
      // Ignore if not present
    }
  }

  async screenshot(name: string): Promise<Buffer> {
    return this.page.screenshot({ path: join('screenshots', `${name}.png`) });
  }

  get expect() {
    return expect;
  }
}