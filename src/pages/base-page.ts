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
      console.log('Cookie banner accepted');
    } catch (_error) { // eslint-disable-line @typescript-eslint/no-unused-vars
      console.log('Cookie banner not found or already dismissed');
    }
  }

  /**
   * Verify that multiple elements are visible
   */
  async verifyElementsVisible(selectors: string[]): Promise<void> {
    for (const selector of selectors) {
      await expect(this.page.locator(selector)).toBeVisible();
    }
  }

  async screenshot(name: string): Promise<Buffer> {
    return this.page.screenshot({ path: join('screenshots', `${name}.png`) });
  }

  get expect() {
    return expect;
  }
}