Feature: Calculate Holiday Entitlement on the government website

    Scenario: Starting page is displayed correctly
        Given I am on the "Calculate holiday entitlement" page
        Then I should see the title "Calculate holiday entitlement"
        And I should see the information section
        And I should see the Related content section
        And I should see the Explore the topic section
        And I should see the "Start now" button

    Scenario: User starts the calculation process
        Given I am on the "Calculate holiday entitlement" page
        When I click the "Start now" button
        Then I should see the question "Does the employee work irregular hours or for part of the year?"
        And I should see the options "Yes" and "No"
        And I should see the "Continue" button

    Scenario: User answers the first question "Yes"
        Given I am on the first question of the calculation process
        When I select "Yes" for the question "Does the employee work irregular hours or for part of the year?"
        And I click the "Continue" button
        Then I should see the question "When does the leave year start?"
        And I should see three fields to enter the date (day, month, year)
        And I should see the "Continue" button
        And I should see the "Your answers" section title
        And I should see the first question listed with the answer "Yes" and a "Change" link
        And I should see the "Start again" link

    Scenario: User answers the first question "No"
        Given I am on the first question of the calculation process
        When I select "No" for the question "Does the employee work irregular hours or for part of the year?"
        And I click the "Continue" button
        Then I should see the question "Is the holiday entitlement based on:"
        And I should see the options "days worked per week" and "hours worked per week" and "annualised hours" and "compressed hours" and "shifts"
        And I should see the "Continue" button
        And I should see the "Your answers" section title
        And I should see the first question listed with the answer "No" and a "Change" link
        And I should see the "Start again" link

    Scenario: User enters a valid leave year start date
        Given I am on the "When does the leave year start?" question page
        And I enter "1" into the day field
        And I enter "1" into the month field
        And I enter "2023" into the year field
        When I click the "Continue" button
        Then I should see the question "Is the holiday entitlement based on:"
        And I should see the options "days worked per week" and "hours worked per week" and "annualised hours" and "compressed hours" and "shifts"
        And I should see the "Continue" button
        And I should see the "Your answers" section title
        And I should see the "Start again" link

    Scenario: User enters an invalid leave year start date
        Given I am on the "When does the leave year start?" question page
        And I enter "32" into the day field
        And I enter "13" into the month field
        And I enter "1900" into the year field
        When I click the "Continue" button
        Then I should see an error message "There is a problem"
        And I should see the "Continue" button
        And I should see the "Your answers" section title
        And I should see the "Start again" link

    Scenario: User can complete the holiday calculation process
        Given I am on the "Calculate holiday entitlement" page
        When I click the "Start now" button
        And I select "Yes" for the question "Does the employee work irregular hours or for part of the year?"
        And I click the "Continue" button
        And I enter "1" into the day field
        And I enter "1" into the month field
        And I enter "2023" into the year field
        And I click the "Continue" button
        And I select "days worked per week" for the question "Is the holiday entitlement based on:"
        And I click the "Continue" button
        And I select "for a full leave year" for the question "Do you want to work out holiday:"
        And I click the "Continue" button
        And I enter "5" into the field for the question "Number of days worked per week?"
        And I click the "Continue" button
        Then I should see the title "Information based on your answers"
        And I should see the statutory holiday entitlement with 28 days

    Scenario: User can start again part way through the process
        Given I am on the "Calculate holiday entitlement" page
        When I click the "Start now" button
        And I select "Yes" for the question "Does the employee work irregular hours or for part of the year?"
        And I click the "Continue" button
        And I enter "1" into the day field
        And I enter "1" into the month field
        And I enter "2023" into the year field
        And I click the "Continue" button
        And I select "days worked per week" for the question "Is the holiday entitlement based on:"
        And I click the "Continue" button
        And I click the "Start again" link
        Then I should see the title "Calculate holiday entitlement"
        And I should see the "Start now" button

    Scenario: User can change their answer to the first question
        Given I am on the "When does the leave year start?" question page
        When I click the "Change" link
        Then I should see the question "Does the employee work irregular hours or for part of the year?"
        And I should see the options "Yes" and "No"
        And the "Yes" option should be selected
        And I should see the "Continue" button

    // Additional scenarios can be added to cover all the questions and answer options in the calculation process, as well as edge cases and error handling.