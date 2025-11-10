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
   * Initialize Materialize components
   * @function initMaterialize
   */
  function initMaterialize() {
    /**
     * Initialize Materialize sidenav (mobile navigation drawer)
     * Activates sliding side navigation for mobile/tablet views
     * @see {@link https://materializecss.com/sidenav.html}
     */
    if ($ && $('.sidenav').sidenav) {
      $('.sidenav').sidenav();
    }

    /**
     * Initialize Materialize parallax effect
     * Creates smooth scrolling parallax effect on hero images
     * @see {@link https://materializecss.com/parallax.html}
     */
    if ($ && $('.parallax').parallax) {
      $('.parallax').parallax();
    }
  }

  /**
   * Document ready function - executes when DOM is fully loaded
   * Initializes all Materialize CSS components used in the website
   *
   * @function
   * @name documentReady
   */
  $(function () {
    initMaterialize();
  }); // end of document ready

  // Export for testing
  if (typeof window !== 'undefined') {
    window.initMaterialize = initMaterialize;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initMaterialize };
  }
})(typeof jQuery !== 'undefined' ? jQuery : null); // end of jQuery name space
