Feature: Register User

  Scenario: Register new username
    Given User navigated to the register page
    When User registers a new user
    Then Registration is successful
