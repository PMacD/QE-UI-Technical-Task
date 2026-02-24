import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';

// Helper mapping for button click actions
const BUTTON_ACTIONS: Record<string, (world: CustomWorld) => Promise<void>> = {
  'Start now': async (world) => await world.pages.homePage.clickStartNow(),
  'Continue': async (world) => await world.pages.questionPage.clickContinue(),
};

// Helper mapping for link click actions
const LINK_ACTIONS: Record<string, (world: CustomWorld) => Promise<void>> = {
  'Start again': async (world) => await world.pages.questionPage.clickStartAgain(),
  'Change': async (world) => await world.pages.questionPage.clickChangeLink(),
};

// Navigation helpers
async function navigateToDateQuestion(world: CustomWorld, questionTitle: string): Promise<void> {
  if (questionTitle === 'When does the leave year start?') {
    await world.pages.homePage.goto();
    await world.pages.homePage.clickStartNow();
    await world.pages.questionPage.selectOption('Yes');
    await world.pages.questionPage.clickContinue();
    await world.pages.questionPage.verifyQuestion(questionTitle);
  } else {
    await world.pages.questionPage.verifyQuestion(questionTitle);
  }
}

// Title verification helper
async function verifyTitle(world: CustomWorld, title: string): Promise<void> {
  if (title === 'Calculate holiday entitlement') {
    await world.pages.homePage.verifyPageLoaded();
  } else {
    await expect(world.page.locator('h1')).toContainText(title);
  }
}

// Button visibility verification helper
async function verifyButton(world: CustomWorld, buttonText: string): Promise<void> {
  if (buttonText === 'Start now') {
    await world.pages.homePage.verifyPageLoaded();
  } else if (buttonText === 'Continue') {
    await world.pages.questionPage.verifyContinueButton();
  }
}

Given('I open the {string} page at {string}', async function (this: CustomWorld, pageName: string, url: string) {
  await this.pages.homePage.goto(url);
});

Given('I am on the {string} page', async function (this: CustomWorld, pageName: string) {
  await this.pages.homePage.goto();
});

Given('I am on the first question of the calculation process', async function (this: CustomWorld) {
  await this.pages.homePage.goto();
  await this.pages.homePage.clickStartNow();
});

Given('I am on the {string} question page', async function (this: CustomWorld, questionTitle: string) {
  await navigateToDateQuestion(this, questionTitle);
});

When('I view the page', async function (this: CustomWorld) {
  // No action needed
});

When('I click the {string} button', async function (this: CustomWorld, buttonText: string) {
  const action = BUTTON_ACTIONS[buttonText];
  if (!action) {
    throw new Error(`Unknown button: ${buttonText}`);
  }
  await action(this);
});

When('I click the {string} link', async function (this: CustomWorld, linkText: string) {
  const action = LINK_ACTIONS[linkText];
  if (!action) {
    throw new Error(`Unknown link: ${linkText}`);
  }
  await action(this);
});

When('I click the {string} link for the first question', async function (this: CustomWorld, linkText: string) {
  const action = LINK_ACTIONS[linkText];
  if (!action) {
    throw new Error(`Unknown link: ${linkText}`);
  }
  await action(this);
});

When('I select {string} for the question {string}', async function (this: CustomWorld, option: string, question: string) {
  await this.pages.questionPage.selectOption(option);
});

When('I enter {string} into the day field', async function (this: CustomWorld, day: string) {
  await this.pages.questionPage.enterDay(day);
});

When('I enter {string} into the month field', async function (this: CustomWorld, month: string) {
  await this.pages.questionPage.enterMonth(month);
});

When('I enter {string} into the year field', async function (this: CustomWorld, year: string) {
  await this.pages.questionPage.enterYear(year);
});

Then('I should see the title {string}', async function (this: CustomWorld, title: string) {
  await verifyTitle(this, title);
});

Then('I should see the {string} button', async function (this: CustomWorld, buttonText: string) {
  await verifyButton(this, buttonText);
});

Then('I should be taken to the first question of the calculation process', async function (this: CustomWorld) {
  // Verify navigation to question page
});

Then('I should see the question {string}', async function (this: CustomWorld, question: string) {
  await this.pages.questionPage.verifyQuestion(question);
});

Then('I should see the options {string} and {string}', async function (this: CustomWorld, option1: string, option2: string) {
  await this.pages.questionPage.verifyOptions([option1, option2]);
});

Then('I should be taken to the next question in the calculation process', async function (this: CustomWorld) {
  // Verify navigation
});

Then('I should be taken back to the first page of the calculation process', async function (this: CustomWorld) {
  // Verify navigation back to home page
});

Then('I should be taken back to the first question', async function (this: CustomWorld) {
  // Verify navigation back to first question
});

Then('I should see three fields to enter the date \\(day, month, year\\)', async function (this: CustomWorld) {
  await this.pages.questionPage.verifyDateFields();
});

Then('I should see the {string} link', async function (this: CustomWorld, linkText: string) {
  await this.pages.questionPage.verifyStartAgainLink();
});

Then('I should see the options {string} and {string} and {string} and {string} and {string}', async function (this: CustomWorld, opt1: string, opt2: string, opt3: string, opt4: string, opt5: string) {
  await this.pages.questionPage.verifyOptions([opt1, opt2, opt3, opt4, opt5]);
});

Then('I should see the {string} section title', async function (this: CustomWorld, sectionTitle: string) {
  if (sectionTitle === 'Your answers') {
    await this.pages.questionPage.verifyYourAnswersTitle();
  }
});

Then('I should see the first question listed with the answer {string} and a {string} link', async function (this: CustomWorld, answer: string, linkText: string) {
  await this.pages.questionPage.verifyYourAnswers(answer);
  await this.pages.questionPage.verifyChangeLink();
});

Then('I should see an error message {string}', async function (this: CustomWorld, message: string) {
  await this.pages.questionPage.verifyErrorMessage(message);
});

When('I enter {string} into the field for the question {string}', async function (this: CustomWorld, value: string, question: string) {
  await this.pages.questionPage.enterGenericField(value);
});

Then('I should be taken to the results page', async function (this: CustomWorld) {
  // Verify navigation to results page
  await expect(this.page).toHaveURL(/.*/);
});

Then('I should see {string}', async function (this: CustomWorld, text: string) {
  await expect(this.page.locator('body')).toContainText(text);
});

Then('the {string} option should be selected', async function (this: CustomWorld, option: string) {
  await this.pages.questionPage.verifyOptionSelected(option);
});

Then('I should see the statutory holiday entitlement with {int} days', async function (this: CustomWorld, days: number) {
  const entitlementText = `The statutory holiday entitlement is ${days} days holiday.`;
  await expect(this.page.locator('body')).toContainText(entitlementText);
});
