import { BasePage } from './base-page';

export class HomePage extends BasePage {
  get elements() {
    return {
      title: 'h1:has-text("Calculate holiday entitlement")',
      startButton: 'a:has-text("Start now")',
    };
  }

  async verifyPageLoaded(): Promise<void> {
    await this.expect(this.page.locator(this.elements.title)).toBeVisible();
    await this.expect(this.page.locator(this.elements.startButton)).toBeVisible();
  }

  async clickStartNow(): Promise<void> {
    await this.page.click(this.elements.startButton);
  }
}