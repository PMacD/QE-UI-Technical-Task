import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';

/**
 * Helper mappings and utility functions for step definitions
 */
export class StepHelpers {
  // Helper mapping for button click actions
  static readonly BUTTON_ACTIONS: Record<string, (world: CustomWorld) => Promise<void>> = {
    'Start now': async (world) => await world.pages.homePage.clickStartNow(),
    'Continue': async (world) => await world.pages.questionPage.clickContinue(),
  };

  // Helper mapping for link click actions
  static readonly LINK_ACTIONS: Record<string, (world: CustomWorld) => Promise<void>> = {
    'Start again': async (world) => await world.pages.questionPage.clickStartAgain(),
    'Change': async (world) => await world.pages.questionPage.clickChangeLink(),
  };

  /**
   * Configuration for navigating to specific questions via predefined paths
   */
  private static readonly QUESTION_NAVIGATION_PATHS: Record<string, (world: CustomWorld) => Promise<void>> = {
    'When does the leave year start?': async (world) => {
      await world.pages.homePage.goto();
      await world.pages.homePage.clickStartNow();
      await world.pages.questionPage.selectOption('Yes');
      await world.pages.questionPage.clickContinue();
    },
  };

  /**
   * Navigate to a specific question page with extendable configuration
   */
  static async navigateToDateQuestion(world: CustomWorld, questionTitle: string): Promise<void> {
    const navigationPath = this.QUESTION_NAVIGATION_PATHS[questionTitle];
    if (navigationPath) {
      await navigationPath(world);
    }
    // Verify we've reached the question
    await world.pages.questionPage.verifyQuestion(questionTitle);
  }

  /**
   * Verify a page title
   */
  static async verifyTitle(world: CustomWorld, title: string): Promise<void> {
    if (title === 'Calculate holiday entitlement') {
      await world.pages.homePage.verifyPageLoaded();
    } else {
      await expect(world.page.locator('h1')).toContainText(title);
    }
  }

  /**
   * Verify button visibility
   */
  static async verifyButton(world: CustomWorld, buttonText: string): Promise<void> {
    if (buttonText === 'Start now') {
      await world.pages.homePage.verifyPageLoaded();
    } else if (buttonText === 'Continue') {
      await world.pages.questionPage.verifyContinueButton();
    }
  }
}
