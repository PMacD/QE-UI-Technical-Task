# Solirius QE UI Technical Task

Your task is to create a functional automated UI test suite using JavaScript, TypeScript, or a language of your choice. We would prefer you to use tools like Playwright or Cypress. -> I have used VSCode to create a test suite in Playwright & Typescript along with Cucumber/BDD ("Cucumber (Gherkin) Full Support" VSCode extension).

## 📝 The Task - Part 1

On a public facing UK Government webpage 'Calculate your holiday entitlement', please write a working automated UI test suite. ✅ 
   -> I have created a suite of 12 tests that verify a selection of behaviours/features that are present throughout the site.  I would continue to build on this in order to cover all customer journeys, plus error scenarios and edge cases.

If the language/framework you decide to use supports BDD/Gherkin, you have the choice to use this or not. Though its usage is optional and therefore won't impact scoring. ✅ 
   -> I have not written Playwright tests using feature files before so I was curious to give it a try ...I like it 😀

## 🚀 Running the Tests

To build and run the automated test suite:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the test suite:
   ```bash
   npm run test:feature
   ```

The tests will execute and display results in the terminal.

## 🎢 The Task - Part 2 (bonus task)

Task two is to launch the basic web page we have created 'index.html' and provide us with a list of Accessibility issues/bugs you can find.

You can provide your list of answers anywhere you like, but tell us where you have put them. (e.g. within you README.md). Finally please provide at least one of them in the format of a Bug report. (doesn't have to be more then 1 in this format, the others can just be a quick list).

-> Issues

General issues:
Testing using MacOS Screenreader
1. "Accessibility" spelt incorrectly.
2. Page heading description is unclear/confusing: "Heading level 2 Accesibility Chat Robot, 3 Items"
3. In safari - attempt to use "Reader mode" displays nothing.
4. 'Robot' image is unlabelled (file name only).
   -> in bug report format:

Bug title/summary: Accessibility issue:'Robot' image is unlabelled
Description:
   Repro steps: 
   1. Open the webpage in browser
   2. activate screenreader, on mac 'cmd' + 'f5'
   3. tab or 'ctrl' + 'option' + 'right/left arrow' to navigate to the image

   Result:
   - voiceover reads "[filename], image" 

   Expected:
   - voiceover reads a meaningful image label/description, e.g. "image of large blue humanoid robot"

Chrome Lighthouse accessibility audit:
1. Image elements do not have [alt] attributes
2. Document doesn't have a <title> element
3. <html> element does not have a [lang] attribute
4. Document does not have a main landmark.

-> for a real website I would also test on mobile devices where screenreader use is more prevalent.
