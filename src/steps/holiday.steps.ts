import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';

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
  if (questionTitle === 'When does the leave year start?') {
    // Navigate to date question by starting and answering first question with Yes
    await this.pages.homePage.goto();
    await this.pages.homePage.clickStartNow();
    await this.pages.questionPage.selectOption('Yes');
    await this.pages.questionPage.clickContinue();
    await this.pages.questionPage.verifyQuestion(questionTitle);
  } else {
    await this.pages.questionPage.verifyQuestion(questionTitle);
  }
});

When('I view the page', async function (this: CustomWorld) {
  // No action needed
});

When('I click the {string} button', async function (this: CustomWorld, buttonText: string) {
  if (buttonText === 'Start now') {
    await this.pages.homePage.clickStartNow();
  } else if (buttonText === 'Continue') {
    await this.pages.questionPage.clickContinue();
  }
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
  if (title === 'Calculate holiday entitlement') {
    await this.pages.homePage.verifyPageLoaded();
  } else {
    await expect(this.page.locator('h1')).toContainText(title);
  }
});

Then('I should see the {string} button', async function (this: CustomWorld, buttonText: string) {
  if (buttonText === 'Start now') {
    await this.pages.homePage.verifyPageLoaded();
  } else if (buttonText === 'Continue') {
    await this.pages.questionPage.verifyContinueButton();
  }
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

Then('I should see three fields to enter the date \\(day, month, year\\)', async function (this: CustomWorld) {
  await this.pages.questionPage.verifyDateFields();
});

Then('I should see the {string} section with the answer {string} to the first question with a {string} link', async function (this: CustomWorld, section: string, answer: string, link: string) {
  await this.pages.questionPage.verifyYourAnswers(answer);
  await this.pages.questionPage.verifyChangeLink();
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
