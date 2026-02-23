import { BasePage } from './base-page';

export class QuestionPage extends BasePage {
  get elements() {
    return {
      questionText: 'h1',
      yesOption: 'label.govuk-radios__label[for="response-0"]:has-text("Yes")',
      noOption: 'label.govuk-radios__label[for="response-1"]:has-text("No")',
      continueButton: 'button[type="submit"]:has-text("Continue")',
      yourAnswersSection: '.govuk-summary-list',
      changeLink: '.govuk-summary-list a[data-module="ga4-link-tracker"]:has-text("Change")',
      startAgainLink: 'a:has-text("Start again")',
      errorMessage: '.govuk-error-summary__title:has-text("There is a problem")',
      // For date fields
      dayField: 'input[name="response[day]"]',
      monthField: 'input[name="response[month]"]',
      yearField: 'input[name="response[year]"]',
      // For entitlement options
      daysWorkedOption: 'input[value="days-worked-per-week"]',
      hoursWorkedOption: 'input[value="hours-worked-per-week"]',
      annualisedHoursOption: 'input[value="annualised-hours"]',
      compressedHoursOption: 'input[value="compressed-hours"]',
      shiftsOption: 'input[value="shifts"]',
      // For leave year options
      fullLeaveYearOption: 'input[value="full-year"]',
      // Generic input fields
      textInput: 'input[type="text"]',
      numberInput: 'input[type="number"]',
    };
  }

  async selectOption(option: string): Promise<void> {
    switch (option) {
      case 'Yes':
        await this.page.click(this.elements.yesOption);
        break;
      case 'No':
        await this.page.click(this.elements.noOption);
        break;
      case 'days worked per week':
        await this.page.click(this.elements.daysWorkedOption);
        break;
      case 'hours worked per week':
        await this.page.click(this.elements.hoursWorkedOption);
        break;
      case 'annualised hours':
        await this.page.click(this.elements.annualisedHoursOption);
        break;
      case 'compressed hours':
        await this.page.click(this.elements.compressedHoursOption);
        break;
      case 'shifts':
        await this.page.click(this.elements.shiftsOption);
        break;
      case 'for a full leave year':
        await this.page.click(this.elements.fullLeaveYearOption);
        break;
      default:
        throw new Error(`Unknown option: ${option}`);
    }
  }

  async clickContinue(): Promise<void> {
    await this.page.click(this.elements.continueButton);
  }

  async verifyQuestion(question: string): Promise<void> {
    await this.expect(this.page.locator(this.elements.questionText)).toHaveText(question);
  }

  async verifyOptions(options: string[]): Promise<void> {
    for (const option of options) {
      // Assuming options are visible text or labels
      await this.expect(this.page.locator(`label:has-text("${option}")`)).toBeVisible();
    }
  }

  async verifyYourAnswers(answer: string): Promise<void> {
    await this.expect(this.page.locator(this.elements.yourAnswersSection)).toContainText(answer);
  }

  async verifyChangeLink(): Promise<void> {
    await this.expect(this.page.locator(this.elements.changeLink)).toBeVisible();
  }

  async verifyStartAgainLink(): Promise<void> {
    await this.expect(this.page.locator(this.elements.startAgainLink)).toBeVisible();
  }

  async verifyContinueButton(): Promise<void> {
    await this.expect(this.page.locator(this.elements.continueButton)).toBeVisible();
  }

  async verifyDateFields(): Promise<void> {
    await this.expect(this.page.locator(this.elements.dayField)).toBeVisible();
    await this.expect(this.page.locator(this.elements.monthField)).toBeVisible();
    await this.expect(this.page.locator(this.elements.yearField)).toBeVisible();
  }

  async enterDay(day: string): Promise<void> {
    await this.page.fill(this.elements.dayField, day);
  }

  async enterMonth(month: string): Promise<void> {
    await this.page.fill(this.elements.monthField, month);
  }

  async enterYear(year: string): Promise<void> {
    await this.page.fill(this.elements.yearField, year);
  }

  async verifyYourAnswersTitle(): Promise<void> {
    await this.expect(this.page.locator(this.elements.yourAnswersSection)).toBeVisible();
  }

  async verifyErrorMessage(message: string): Promise<void> {
    await this.expect(this.page.locator(this.elements.errorMessage)).toContainText(message);
  }

  async enterGenericField(value: string): Promise<void> {
    const input = await this.page.locator(this.elements.numberInput + ', ' + this.elements.textInput).first();
    await input.fill(value);
  }
}