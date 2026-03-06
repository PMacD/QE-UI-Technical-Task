import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';
import { StepHelpers } from './step-helpers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
Given('I am on the {string} page', async function (this: CustomWorld, _pageName: string) {
  await this.pages.homePage.goto();
});

Given('I am on the first question of the calculation process', async function (this: CustomWorld) {
  await this.pages.homePage.goto();
  await this.pages.homePage.clickStartNow();
});

Given('I am on the {string} question page', async function (this: CustomWorld, questionTitle: string) {
  await StepHelpers.navigateToDateQuestion(this, questionTitle);
});

When('I click the {string} button', async function (this: CustomWorld, buttonText: string) {
  const action = StepHelpers.BUTTON_ACTIONS[buttonText];
  if (!action) {
    throw new Error(`Unknown button: ${buttonText}`);
  }
  await action(this);
});

When('I click the {string} link', async function (this: CustomWorld, linkText: string) {
  const action = StepHelpers.LINK_ACTIONS[linkText];
  if (!action) {
    throw new Error(`Unknown link: ${linkText}`);
  }
  await action(this);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
When('I select {string} for the question {string}', async function (this: CustomWorld, option: string, _question: string) {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
When('I enter {string} into the field for the question {string}', async function (this: CustomWorld, value: string, _question: string) {
  await this.pages.questionPage.enterGenericField(value);
});

Then('I should see the title {string}', async function (this: CustomWorld, title: string) {
  await StepHelpers.verifyTitle(this, title);
});

Then('I should see the {string} button', async function (this: CustomWorld, buttonText: string) {
  await StepHelpers.verifyButton(this, buttonText);
});

Then('I should see the information section', async function (this: CustomWorld) {
  await this.pages.homePage.verifyInformationSection();
});

Then('I should see the Related content section', async function (this: CustomWorld) {
  await this.pages.homePage.verifyRelatedContentSection();
});

Then('I should see the Explore the topic section', async function (this: CustomWorld) {
  await this.pages.homePage.verifyExploreTopicSection();
});

Then('I should see the question {string}', async function (this: CustomWorld, question: string) {
  await this.pages.questionPage.verifyQuestion(question);
});

// Consolidated option verification - supports 2 options
Then('I should see the options {string} and {string}', async function (this: CustomWorld, option1: string, option2: string) {
  await this.pages.questionPage.verifyOptions([option1, option2]);
});

Then('I should see three fields to enter the date \\(day, month, year\\)', async function (this: CustomWorld) {
  await this.pages.questionPage.verifyDateFields();
});

// Consolidated option verification - supports 5 options
Then('I should see the options {string} and {string} and {string} and {string} and {string}', async function (this: CustomWorld, opt1: string, opt2: string, opt3: string, opt4: string, opt5: string) {
  await this.pages.questionPage.verifyOptions([opt1, opt2, opt3, opt4, opt5]);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
Then('I should see the {string} link', async function (this: CustomWorld, _linkText: string) {
  await this.pages.questionPage.verifyStartAgainLink();
});

Then('I should see the {string} section title', async function (this: CustomWorld, _sectionTitle: string) {
  if (_sectionTitle === 'Your answers') {
    await this.pages.questionPage.verifyYourAnswersSection();
  }
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
Then('I should see the first question listed with the answer {string} and a {string} link', async function (this: CustomWorld, answer: string, _linkText: string) {
  await this.pages.questionPage.verifyYourAnswers(answer);
  await this.pages.questionPage.verifyChangeLink();
});

Then('I should see an error message {string}', async function (this: CustomWorld, message: string) {
  await this.pages.questionPage.verifyErrorMessage(message);
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
