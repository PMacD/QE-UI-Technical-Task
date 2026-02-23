import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from 'playwright';
import { AllPagesObject } from '../pages/all-pages-object';
import { HomePage } from '../pages/home-page';
import { QuestionPage } from '../pages/question-page';
import config from '../config';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  pages!: AllPagesObject;

  async init(): Promise<void> {
    this.browser = await chromium.launch({ headless: config.runHeadless });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.pages = new AllPagesObject(
      new HomePage(this.page, this.context),
      new QuestionPage(this.page, this.context)
    );
  }

  async close(): Promise<void> {
    await this.context.close();
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);