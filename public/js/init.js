/**
 * @fileoverview Materialize CSS Component Initialization
 * Initializes Materialize components (sidenav, parallax) when DOM is ready
 * @author Marcelo Costa
 * @version 2.0.0
 * Optional dependency: jQuery (legacy fallback only)
 * @requires materialize-css
 */

/**
 * IIFE (Immediately Invoked Function Expression) that wraps initialization
 * Protects $ alias and prevents global namespace pollution
 *
 * @param {Function|null} $ - Optional jQuery-compatible function (if present)
 * @param {object|undefined} M - Materialize global (window.M)
 */
(function ($, M) {
  /**
   * Initialize Materialize components
   * @function initMaterialize
   */
  function initMaterialize() {
    // Prefer Materialize's native initialization (no jQuery dependency)
    if (M) {
      if (typeof M.AutoInit === 'function') {
        M.AutoInit();
      } else {
        /**
         * Initialize Materialize sidenav (mobile navigation drawer)
         * @see {@link https://materializecss.com/sidenav.html}
         */
        if (M.Sidenav && typeof M.Sidenav.init === 'function') {
          M.Sidenav.init(document.querySelectorAll('.sidenav'));
        }
        /**
         * Initialize Materialize parallax effect
         * @see {@link https://materializecss.com/parallax.html}
         */
        if (M.Parallax && typeof M.Parallax.init === 'function') {
          M.Parallax.init(document.querySelectorAll('.parallax'));
        }
      }
    } else if ($) {
      // Fallback for legacy pages where Materialize was used via jQuery plugins
      if ($ && $('.sidenav').sidenav) {
        $('.sidenav').sidenav();
      }
      if ($ && $('.parallax').parallax) {
        $('.parallax').parallax();
      }
    }

    // Disable right-click on images to discourage downloading
    document.addEventListener('contextmenu', function (e) {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
      }
    });
  }

  /**
   * Document ready function - executes when DOM is fully loaded
   * Initializes all Materialize CSS components used in the website
   *
   * @function
   * @name documentReady
   */
  // Native DOM ready (works with and without jQuery)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMaterialize);
  } else {
    initMaterialize();
  }

  // Export for testing
  if (typeof window !== 'undefined') {
    window.initMaterialize = initMaterialize;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initMaterialize };
  }
})(
  typeof jQuery !== 'undefined' ? jQuery : null,
  typeof window !== 'undefined' ? window.M : undefined
); // end of module scope
// test comment
