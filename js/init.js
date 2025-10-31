/**
 * @fileoverview Materialize CSS Component Initialization
 * Initializes Materialize components (sidenav, parallax) when DOM is ready
 * Uses jQuery for cross-browser compatibility
 * @author Marcelo Costa
 * @version 1.0.0
 * @requires jquery
 * @requires materialize-css
 */

/**
 * IIFE (Immediately Invoked Function Expression) that wraps initialization
 * Protects $ alias and prevents global namespace pollution
 *
 * @param {jQuery} $ - jQuery object passed to ensure $ alias works correctly
 */
(function ($) {
  /**
   * Document ready function - executes when DOM is fully loaded
   * Initializes all Materialize CSS components used in the website
   *
   * @function
   * @name documentReady
   */
  $(function () {
    /**
     * Initialize Materialize sidenav (mobile navigation drawer)
     * Activates sliding side navigation for mobile/tablet views
     * @see {@link https://materializecss.com/sidenav.html}
     */
    $('.sidenav').sidenav();

    /**
     * Initialize Materialize parallax effect
     * Creates smooth scrolling parallax effect on hero images
     * @see {@link https://materializecss.com/parallax.html}
     */
    $('.parallax').parallax();
  }); // end of document ready
})(jQuery); // end of jQuery name space
