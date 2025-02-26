import React from 'react';

const CypressSection = () => {
  const downloadFile = () => {
    window.open("https://github.com/mcello23/cypress-amazon/archive/refs/heads/master.zip");
  };

  return (
    <div className="container center-align">
      <br />
      <br />
      <h3 className="title-frame dark center-align" id="title-cyp"><b>Amazon Automation</b></h3>
      <h4 className="mdi-content-send dark center-align" id="title-cyp2"><b>Using Cypress</b></h4>
      <div className="section">
        <img className="image-cyp right-align" src={`${process.env.PUBLIC_URL}/images/cypress-logo.jpeg`} alt="cypress-logo" /><br />
        <div className="row">
          <div className="center-align">
            <img className="image-amz center-align" src="https://technicallyautonomous.com/wp-content/uploads/2021/05/iphone-x-homepage-view.png" alt="amazon-website" />
            <p className="text-accent-2 waves-green left-align">I have recently created a compact and efficient test suite using the Cypress testing framework. The suite runs through the Amazon website and verifies the contents of the shopping cart in various ways. The test suite was written using <b>JavaScript</b>, a high-level programming language that is widely used for web development.
            </p>
            <p className="text-accent-2 waves-green left-align">
              In order to run the test suite, you will need to have Cypress installed, as well as Node.js and NPM. A web browser will also be required. If you would like more information on how to set up and run the test suite, please follow the link provided, where I have detailed all the necessary steps.
            </p><img className="image-js center-align" src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="javascript-logo" />
            <p className="text-accent-2 waves-green left-align"><b>
              The test suite contains three distinct test cases:
            </b></p>
            <p className="text-accent-2 waves-green left-align">
              1. Verify Amazon's Title Webpage.
            </p>
            <p className="text-accent-2 waves-green left-align">
              2. Search For a Nespresso Coffee Machine And Assert It In The Cart.
            </p>
            <p className="text-accent-2 waves-green left-align">
              3. Search For A Specific Nespresso Machine And Assert It In The Cart In A Different Way.
            </p><br /><br />
            <h4 className="mdi-content-send dark center-align"><b>Video of the Test Suite</b></h4>
            <h5 className="mdi-content-send dark center-align"><b>Runs and asserts in 51 seconds:</b></h5><br />
          </div>

          <video id="video-amz" className="video container center-align" controls preload="metadata">
            <source src={`${process.env.PUBLIC_URL}/videos/testing_amazon.cy.js.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video><br /><br /><br /><br />
          <div className="row center">
            <a id="download-button6" className="btn-large waves-effect waves-light teal lighten-1 left-align" onClick={downloadFile}>Download the Test Suite</a>
            <a href="https://github.com/mcello23/cypress-amazon" id="download-button7" className="btn-large waves-effect waves-light teal lighten-1 pad center-align">Check out my GitHub project</a>
          </div><br /><br />
          <h4 className="mdi-content-send dark center-align"><b>Code Explained:</b></h4><br />
          <div className="code-container" data-bgcolor="black">
            <pre>
              <code className="language-javascript">
                {`describe('Amazon', function() {
                  beforeEach(function() {
                   //Visits the Amazon Spain webpage:
                   cy.visit('https://www.amazon.es/')
                   //Clicks on the continue without accepting cookies for better visualization of the exercise:
                   cy.get('#sp-cc-rejectall-container').click()
                 })
                 it('Verifies the title of the Webpage', function() {
                   cy.title().should('be.equal', 'Amazon.es: compra online de electrónica, libros, deporte, hogar, moda y mucho más.') //Assertion of the Amazon webpage by its title, not the h1, the <head></head>
               })
                 it('Searches for a Nespresso product and adds it to the cart', function() {

                   cy.get('#twotabsearchtextbox').type('Cafetera Nespresso') //Here, it finds the search bar and clicks on it and writes 'Cafetera Nespresso'
                   cy.get('#nav-search-submit-button').click() //It looks for the search icon and clicks on it
                   cy.get('[data-asin="B00G5YOVZA"] > .sg-col-inner > .s-widget-container > .s-card-container > .a-spacing-base > .s-product-image-container > .rush-component > .a-link-normal > .a-section > .s-image').scrollIntoView().click() //Here I'm telling Cypress to look for a specific coffee machine by its ID, and it scrolls down until it finds and then clicks on it
                   cy.get('#add-to-cart-button-ubb').click() //It looks for the 'Add to cart' button and clicks on it
                   cy.get('#sw-gtc > .a-button-inner > .a-button-text').click() //It looks for the 'View this in cart' button and clicks on it
                   //Assertion
                   cy.get('h1').contains('Cesta') //And finally the assertion, when we enter the 'Cart' page, there's an element called 'Cesta' in the page, which it looks for it by it's ID and it verifies that it contains the text 'Cesta' and it assures that it passes.
                 })
                 //Here, I want to do the same test case in a different way
                 it('Searches for a specific Nespresso SNE900 product, adds it to the cart and validates it', function() {

                   cy.get('#twotabsearchtextbox').type('NESPRESSO SNE900') //Here, it finds the search bar and clicks on it and writes 'NESPRESSO SNE900'
                   cy.get('#nav-search-submit-button').click() //It looks for the search icon and clicks on it
                   cy.get('[data-asin="B08LDSF6XP"] > .sg-col-inner > .s-widget-container > .s-card-container > :nth-child(1) > .puis-padding-left-small > .s-title-instructions-style > .a-size-mini > .a-link-normal > .a-size-base-plus').click() //Since there's 23 results, I tell cypress to click on the model of the coffee machine by the ID that I've passed on
                   cy.get('#add-to-cart-button').click() //It looks for the 'Add to cart' button and clicks on it
                   cy.get('#attachSiNoCoverage').click() //It looks for the 'No, thank you' in the Extra Warranty slider and clicks on it
                   cy.get('#sw-gtc > .a-button-inner > .a-button-text').click() //It looks for the 'View this in cart' button and clicks on it
                   //Assertion
                   cy.get('.a-color-base > .a-truncate > .a-truncate-cut').contains('NESPRESSO SNE900') //Here the assertion is slightly different than in the last test case, it looks 'NESPRESSO SNE900' is in the child element inside the cart. It finds it and it passes the test.
                 })

                 })`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CypressSection;
