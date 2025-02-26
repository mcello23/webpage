import React from 'react';

const CucumberAppiumSection = () => {
  return (
    <div className="container center-align">
      <br />
      <br />
      <h3 className="title-frame dark center-align" id="title-cyp3"><b>Android Automation</b></h3>
      <h4 className="mdi-content-send dark center-align" id="title-cyp4"><b>Using Cucumber, Appium and Ruby</b></h4>
      <img className="image-cyp right-align" src={`${process.env.PUBLIC_URL}/images/cucumber-logo.png`} alt="cucumber-logo" /><br />
      <div className="row">
        <div className="center-align">
          <img className="image-amz center-align" src="./images/simulated_android_app.jpg" alt="amazon-website" />
          <p className="text-accent-2 waves-green left-align">
            This is a test made for Android using <b>Android Studio</b> for a simulated device in which I used a real life app called "Unit Converter", available <a href="https://play.google.com/store/apps/details?id=com.ba.universalconverter&hl=en_IE&gl=US">here</a>.
            I've created a total of 14 test cases in which they're really simple to read and test the Main menu of the app, the Home screen and the Gestures.
            To develop this test I used <b>Cucumber</b> test engine with <b>Gherkin</b> language, executing through <b>Ruby</b> environment, with <b>Appium</b> driver in a simulated Android device.
          </p>
          <img className="image-cyp right-align" src={`${process.env.PUBLIC_URL}/images/appium-logo.png`} alt="appium-logo" />
          <p className="text-accent-2 waves-green left-align">
            I've installed the app inside an Android simulated device, using "adb install" command in terminal.
            Then, I created the feature file of each section I wanted to test, in which I detailed the steps of execution through Ruby language.
            I also created tags, hooks, detailed the environment in Ruby, which you can see it in my GitHub link down below.
          </p>
          <p className="text-accent-2 waves-green left-align"><b>
            Here are some of the test cases I've written:
          </b></p>
          <img className="image-cyp right-align" src={`${process.env.PUBLIC_URL}/images/ruby-logo.png`} alt="ruby-logo" />
          <p className="text-accent-2 waves-green left-align">
            Show all button should be enabled at launch;
          </p>
          <p className="text-accent-2 waves-green left-align">
            When I tap on menu icon, I should see left side menu;
          </p>
          <p className="text-accent-2 waves-green left-align">
            User able to select values from unit pickers;
          </p>
          <p className="text-accent-2 waves-green left-align">
            User able to swipe to open Calculator.
          </p><br /><br />
          <h4 className="mdi-content-send dark center-align"><b>Video of the Test Suite</b></h4>
          <h5 className="mdi-content-send dark center-align"><b>Runs and asserts 14 screnarios in 4 minutes:</b></h5><br />
        </div>
        <video id="video-cucumber" className="video container center-align" controls preload="metadata">
          <source src={`${process.env.PUBLIC_URL}/videos/Appium and Cucumber Testing in Android.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video><br /><br /><br /><br />
        <div className="row center">
          <a href="https://github.com/mcello23/android_automation" id="download-button9" className="btn-large waves-effect waves-light teal lighten-1 pad center-align">Check out my GitHub project</a>
        </div><br /><br />
        <h4 className="mdi-content-send dark center-align"><b>Gherkin code:</b></h4><br />
        <div className="code-container" data-bgcolor="black">
          <pre>
            <code className="language-gherkin">
              {`@home_screen
              Feature: Tests for Home Screen Functionality
              
                Background:
                  Given I land on home screen
              
                @default
                Scenario: Default values on home screen is Foot and Centimeter
                  Then  Left Unit picker value should be "Foot"
                  And Right unit picker value should be "Centimeter"
              
                Scenario: Show all button should be enabled at launch
                  Then Show All button should be disabled
                  When I type "1" on application keyboard
                  Then Show All button should be enabled
              
              
                Scenario Outline: Verify default conversion
                  When I type "<target>" on application keyboard
                  Then I should see results as "<result>"
              
              Examples:
                  |target|result   |
                  |1     |30.48    |
                  |2     |60.96    |
                  |3     |91.44    |
                  |9     |274.32   |
                  |1011  |30 815.28|
              
              
                Scenario: User able to add current conversion to Favorites list
                  Then I press on Add to Favorites icon
                  When I press on menu icon
                  Then I press on Favorite conversions
                  And I verify "Length" added to Favorite conversions list
              
                Scenario: User able to search by existing Conversion type
                  Then I press on search icon
                  Then I type "Temperature" in search field
                  And I press return button on soft keyboard
                  Then I see "Temperature" as a current unit converter
                  Then Left Unit picker value should be "Celsius"
                  And Right unit picker value should be "Fahrenheit"
              
                Scenario Outline: User able to select values from unit pickers
                  Then I select "<unit_type>" from left unit picker
                  When I type "<amount>" on application keyboard
                  Then I should see results as "<result>"
              
                  Examples:
                    | unit_type | amount | result |
                    | Inch      |1       | 2.54   |
                    | Link      |1       | 20.1168|
              
                  Scenario: User able to convert values
                    When I press on menu icon
                    Then I select "Volume" from menu
                    Then I select "Cup" from right unit picker
                    When I type "1" on application keyboard
                    Then I should see results as "15.1416"
              
              
                Scenario: User able to switch values
                  Then Left Unit picker value should be "Foot"
                  And Right unit picker value should be "Centimeter"
                  When I press on switch unit button
                  Then Left Unit picker value should be "Centimeter"
                  And Right unit picker value should be "Foot"
              
                  Scenario: User able to cleanup conversion history
                    When I press on menu icon
                    Then I select "History" from menu
                    Then I see "History" as a current unit converter
                    Then I should see text "No history right now"
                    When I press on menu icon
                    Then I select "Length" from menu
                    When I type "1" on application keyboard
                    When I press on menu icon
                    Then I select "History" from menu
                    And I verify that 1st result in history list is "Length"
                    When I press delete from history at 1st row
                    Then I should see text "No history right now"
                `}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CucumberAppiumSection;
