/**
 * Navbar Logic
 * Handles mobile menu toggle
 */

// eslint-disable-next-line no-unused-vars -- Function is called from onclick attribute in HTML
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const toggle = document.querySelector('.mobile-menu-toggle');
  const icon = toggle.querySelector('i');
  const expanded = toggle.getAttribute('aria-expanded') === 'true';

  const nowOpen = !expanded;
  menu.classList.toggle('active', nowOpen);
  toggle.classList.toggle('active', nowOpen);
  toggle.setAttribute('aria-expanded', String(nowOpen));

  // Clean up any inline styles that may have been left from previous code
  menu.removeAttribute('style');

  // Toggle icon between menu and close
  icon.textContent = nowOpen ? 'close' : 'menu';
}

