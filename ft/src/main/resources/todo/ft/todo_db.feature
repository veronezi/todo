Feature: [DB] Stressing the application and the DB

  Background:
    Given the system is live
    And I am the 'jdoe' user

  Scenario: I post thousands of rows
    Given the database is empty
    And I 'POST' a json template '{"text": "buy milk %d"}' to '/api/todo' 1000 times
