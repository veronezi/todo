Feature: [UI] Creating and updating todos

  Background:
    Given the system is live
    And the browser is clean
    And I open the '/' page and I enter 'jdoe' in the text field 'Username' label and press enter
    And I enter 'jdoe' in the text field 'Password' label and press enter

  Scenario: I create a new todo
    Given the database is empty
    And I click the 'Add' item
    And I enter 'buy milk' in the text field 'New todo' label and press enter
    Then a list has one element with the 'buy milk' in it
