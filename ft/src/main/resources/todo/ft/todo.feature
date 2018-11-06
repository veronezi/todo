Feature: [Backend] Creating and updating todos

  Background:
    Given the system is live
    And I am the 'jdoe' user

  Scenario: I create a new todo
    Given the database is empty
    Given I create a json '{"text": "buy milk"}' called 'my_json'
    And I 'POST' 'my_json' json to '/api/todo' and save the resulting json as 'my_json'
    Then the 'my_json' json 'id' text field matches '[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}'
    And the 'my_json' json 'text' text field matches 'buy milk'

  Scenario: I load the newly created todo
    Given I execute 'GET' against '/api/todo/:id' with parameters from 'my_json' json and save the resulting json as 'my_newly_created_todo'
    Then 'my_json.id' field is equal to 'my_newly_created_todo.id' field
    And 'my_json.text' field is equal to 'my_newly_created_todo.text' field

  Scenario: I update the todo
    Given I set 'my_json' json 'text' text field to 'buy milk 2p'
    And I 'PUT' 'my_json' json to '/api/todo' and save the resulting json as 'my_updated_json'
    Then the 'my_json' json 'id' field is equal to 'my_updated_json' json 'id' field
    And the 'my_updated_json' json 'text' text field matches 'buy milk 2p'

  Scenario: I list the todos
    Given I execute 'GET' against '/api/todo' and save the resulting json as 'my_list'
    Then 'my_list' list matches
      | text        | id                                                                                   |
      | buy milk 2p | [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12} |
    And the 'id' text field of element '0' of the 'my_list' list is equal to the 'my_json' json 'id' field

  Scenario: I complete a task
    Given I set 'my_json' json 'done' boolean field to 'true'
    And I 'PUT' 'my_json' json to '/api/todo' and save the resulting json as ''
    And I execute 'GET' against '/api/todo' and save the resulting json as 'my_list'
    Then 'my_list' list matches
      | text        | id                                                                                   | done |
      | buy milk 2p | [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12} | true |

  Scenario: I create several todos
    Given I create a json '{"text": "my todo 1"}' called 'my_json_1'
    And  I create a json '{"text": "my todo 2"}' called 'my_json_2'
    And  I create a json '{"text": "my todo 3"}' called 'my_json_3'
    And  I create a json '{"text": "my todo 4"}' called 'my_json_4'
    And I 'POST' 'my_json_1' json to '/api/todo' and save the resulting json as ''
    And I 'POST' 'my_json_2' json to '/api/todo' and save the resulting json as ''
    And I 'POST' 'my_json_3' json to '/api/todo' and save the resulting json as ''
    And I 'POST' 'my_json_4' json to '/api/todo' and save the resulting json as ''
    And I execute 'GET' against '/api/todo' and save the resulting json as 'my_list'
    Then 'my_list' list matches
      | text        | done  |
      | my todo 4   | false |
      | my todo 3   | false |
      | my todo 2   | false |
      | my todo 1   | false |
      | buy milk 2p | true  |
