import { BasePage } from './base-page';

export class HomePage extends BasePage {
  get elements() {
    return {
      title: 'h1:has-text("Calculate holiday entitlement")',
      startButton: '[role="button"]:has-text("Start now")',
      informationSection: 'div[data-module="govspeak"]',
      relatedContentSection: 'nav[aria-label="Related content"]',
      exploreTopicSection: 'aside:has-text("Explore the topic")',
    };
  }

  async verifyPageLoaded(): Promise<void> {
    await this.expect(this.page.locator(this.elements.title)).toBeVisible();
    await this.expect(this.page.locator(this.elements.startButton)).toBeVisible();
  }

  async verifyInformationSection(): Promise<void> {
    await this.expect(this.page.locator(this.elements.informationSection)).toBeVisible();
  }

  async verifyRelatedContentSection(): Promise<void> {
    await this.expect(this.page.locator('text=Related content')).toBeVisible();
  }

  async verifyExploreTopicSection(): Promise<void> {
    await this.expect(this.page.locator('text=Explore the topic')).toBeVisible();
  }

  async clickStartNow(): Promise<void> {
    await this.page.click(this.elements.startButton);
  }
}