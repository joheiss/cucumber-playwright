Feature: Ordering

  Background: 
    Given User opens the application
    And User clicks on the logon link

  Scenario Outline: Add to cart
    Given User enters a username as "<username>"
    And User enters a password as "<password>"
    And User clicks the login button
    When User searches for a "<book>"
    And User adds the book to the cart
    Then cart badge should get updated

    Examples: 
      | username | password  | book            |
      | ortoni   | pass1234$ | Roomies         |
      | ortonikc | pass1234  | The Simple Wild |
