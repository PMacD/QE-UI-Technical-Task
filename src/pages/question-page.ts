import { BasePage } from './base-page';

export class QuestionPage extends BasePage {
  // Map option text to selector keys for easy maintenance
  private readonly optionSelectorMap: Record<string, keyof typeof this.elements> = {
    'Yes': 'yesOption',
    'No': 'noOption',
    'days worked per week': 'daysWorkedOption',
    'hours worked per week': 'hoursWorkedOption',
    'annualised hours': 'annualisedHoursOption',
    'compressed hours': 'compressedHoursOption',
    'shifts': 'shiftsOption',
    'for a full leave year': 'fullLeaveYearOption',
  };

  private readonly optionVerificationMap: Record<string, keyof typeof this.elements> = {
    'Yes': 'yesInput',
    'No': 'noInput',
  };

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
      // Inputs for verification
      yesInput: 'input[id="response-0"]',
      noInput: 'input[id="response-1"]',
    };
  }

  async selectOption(option: string): Promise<void> {
    const selectorKey = this.optionSelectorMap[option];
    if (!selectorKey) {
      throw new Error(`Unknown option: ${option}`);
    }
    const selector = this.elements[selectorKey];
    await this.page.click(selector);
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
    // Call parent class method instead
    await super.verifyElementsVisible([this.elements.dayField, this.elements.monthField, this.elements.yearField]);
  }



  async enterDateField(fieldType: 'day' | 'month' | 'year', value: string): Promise<void> {
    const fieldKey = `${fieldType}Field` as const;
    await this.page.fill(this.elements[fieldKey], value);
  }

  async enterDay(day: string): Promise<void> {
    await this.enterDateField('day', day);
  }

  async enterMonth(month: string): Promise<void> {
    await this.enterDateField('month', month);
  }

  async enterYear(year: string): Promise<void> {
    await this.enterDateField('year', year);
  }

  async verifyYourAnswersSection(): Promise<void> {
    // More accurately named: verify the answers section is visible
    await this.expect(this.page.locator(this.elements.yourAnswersSection)).toBeVisible();
  }

  async verifyErrorMessage(message: string): Promise<void> {
    await this.expect(this.page.locator(this.elements.errorMessage)).toContainText(message);
  }

  async enterGenericField(value: string): Promise<void> {
    // Find first available input field - prefer number fields, fall back to text fields
    let input = this.page.locator(this.elements.numberInput).first();
    const inputCount = await input.count();
    if (inputCount === 0) {
      input = this.page.locator(this.elements.textInput).first();
    }
    if (await input.count() === 0) {
      throw new Error('No input field found on the page');
    }
    await input.fill(value);
  }

  async clickStartAgain(): Promise<void> {
    await this.page.click(this.elements.startAgainLink);
  }

  async clickChangeLink(): Promise<void> {
    await this.page.click(this.elements.changeLink);
  }

  async verifyOptionSelected(option: string): Promise<void> {
    const selectorKey = this.optionVerificationMap[option];
    if (!selectorKey) {
      throw new Error(`Cannot verify selection for option: ${option}`);
    }
    const selector = this.elements[selectorKey];
    await this.expect(this.page.locator(selector)).toBeChecked();
  }
}