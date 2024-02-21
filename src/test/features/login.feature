Feature: User Authentication

  Background: 
    Given User opens the application
    And User clicks on the logon link

  Scenario: Sucessful login
    Given User enters a username as "ortoni11"
    And User enters a password as "Pass1234"
    When User clicks the login button
    Then Login should be successful

  Scenario: Unsuccessful login
    Given User enters a username as "anything"
    And User enters a password as "topsecret"
    When User clicks the login button
    But Login should fail
