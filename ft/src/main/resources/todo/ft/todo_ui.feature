Feature: [UI] Creating and updating todos

  Background:
    Given the system is live
    And the browser is clean
    And I open the '/' page and I enter 'jdoe' in the 'Username *' text field and press enter
    And I enter 'jdoe' in the 'Password *' text field and press enter

  Scenario: I create a new todo
    Given the database is empty
    And I click 'Add'
    And I enter 'buy milk' in the 'New todo' text field and press enter
    Then a list has at least one element with 'buy milk' in it

  Scenario: I navigate to the new todo page and I create a new todo
    Given the database is empty
    And I open the '/todo' page
    And I enter 'buy cheese' in the 'New todo' text field and press enter
    Then a list has at least one element with 'buy cheese' in it
