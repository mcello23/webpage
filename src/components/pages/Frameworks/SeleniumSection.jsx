import React from 'react';

const SeleniumSection = () => {
  return (
    <div className="container">
      <br />
      <h3 className="mdi-content-send dark center-align"><b>Quix Automation</b></h3>
      <h4 className="mdi-content-send dark center-align"><b>Using Selenium</b></h4>
      <div className="section">
        <img className="image-sel right-align" src="https://ewig5qf9cgn.exactdn.com/wp-content/uploads/2020/08/Selenium-SI_Hex-1.svg" alt="selenium-logo" />
        <div className="row">
          <img className="image-quix left-align" src={`${process.env.PUBLIC_URL}/images/quix_webiste.jpg`} alt="quix-webiste" />
          <div className="center-align">
            <p className="text-accent-2 waves-green left-align">
              I created a small test suite in which I test some aspects of a website called <a href="https://www.quix.io/">Quix</a>, a data streaming page.
              While the test suite might seem basic, the objective was to show <b>negative</b> and <b>positive</b> test cases, this means that some had to pass and others to fail in order to show the correct behaviour.
              The test was made with <b>Selenium IDE</b> and the code is written in <b>Python</b>.
            </p>
            <p className="text-accent-2 waves-green left-align"><b>
              Here are some of the test cases I've written:
            </b></p>
            <p className="text-accent-2 waves-green left-align">
              Login Quix;
            </p>
            <img className="image-py right-align" src="https://logos-world.net/wp-content/uploads/2021/10/Python-Symbol.png" alt="python-logo" />
            <p className="text-accent-2 waves-green left-align">
              Case Sensitive Broken;
            </p>
            <p className="text-accent-2 waves-green left-align">
              Alphabetical Selector Broken;
            </p>
            <p className="text-accent-2 waves-green left-align">
              Unable to Edit Code.
            </p><br /><br />
          </div>
          <div className="row">
            <div className="left-align">
              <p id="manual-tests" className="text-accent-2 waves-green left-align"><i>...plus manual tests!</i></p>
              <br />
            </div>
          </div>
        </div>
      </div>
      <br />
      <h4 className="mdi-content-send dark center-align"><b>Screenshot</b></h4>
      <h5 className="mdi-content-send dark center-align"><b>Test suite execution</b></h5><br />
      <img className="image-selenium center-aligned" src={`${process.env.PUBLIC_URL}/images/selenium_screenshot.jpg`} alt="selenium-test" /><br />
      <div className="row center">
        <a href="https://github.com/mcello23/Quix_Testing" id="download-button5" className="btn-large waves-effect waves-light teal lighten-1 pad center-align">Check out my GitHub project</a>
      </div><br /><br /><br />
      <h4 className="mdi-content-send dark center-align"><b>Code Example:</b></h4><br />
      <div className="code-container" data-bgcolor="black">
        <pre>
          <code className="language-python">
            {`import pytest
import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

class Test3CaseSensitive():
  def setup_method(self, method):
    self.driver = webdriver.Chrome()
    self.vars = {}

  def teardown_method(self, method):
    self.driver.quit()

  def test_3CaseSensitive(self):
    # Test name: 3-CaseSensitive
    # Step # | name | target | value
    # 1 | open | webiste
    self.driver.get("https://www.quix.io/")
    # 2 | setWindowSize | 2044x1392 | 
    self.driver.set_window_size(2044, 1392)
    # 3 | click | css=.mat-list-item:nth-child(2) > .mat-list-item-content | 
    self.driver.find_element(By.CSS_SELECTOR, ".mat-list-item:nth-child(2) > .mat-list-item-content").click()
    # 4 | click | css=div > .text-truncate:nth-child(1) | 
    self.driver.find_element(By.CSS_SELECTOR, "div > .text-truncate:nth-child(1)").click()
    # 5 | click | css=.mat-list-item:nth-child(2) > .mat-list-item-content | 
    self.driver.find_element(By.CSS_SELECTOR, ".mat-list-item:nth-child(2) > .mat-list-item-content").click()
    # 6 | click | id=mat-input-0 | 
    self.driver.find_element(By.ID, "mat-input-0").click()
    # 7 | type | id=mat-input-0 | transformation
    self.driver.find_element(By.ID, "mat-input-0").send_keys("transformation")
    # 8 | click | css=.w-100:nth-child(2) | 
    self.driver.find_element(By.CSS_SELECTOR, ".w-100:nth-child(2)").click()
    # 9 | assertText | id=mat-input-0 | RESULTS
    assert self.driver.find_element(By.ID, "mat-input-0").text == "RESULTS"`}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default SeleniumSection;
