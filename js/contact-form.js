/**
 * Contact Form Logic
 * Handles form submission, validation, and bot protection
 */

// Track form load time for timing check
const formLoadTime = Date.now();

// eslint-disable-next-line no-unused-vars -- Function is called from onsubmit attribute in HTML
async function sendCVRequest(e) {
  e.preventDefault();

  const form = document.getElementById('cv-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const btnLoading = document.getElementById('btn-loading');
  const confirmEl = document.getElementById('cv-confirm');
  const successMsg = document.getElementById('success-msg');
  const errorMsg = document.getElementById('error-msg');

  const formData = new FormData(form);
  const name = document.getElementById('cv-name').value.trim();
  const email = document.getElementById('cv-email').value.trim();
  const subject = document.getElementById('cv-subject').value.trim();
  const message = document.getElementById('cv-message').value.trim();
  const honeypot = document.getElementById('botcheck').value;

  // Basic validation
  if (!name || !email || !subject || !message) {
    alert('Please fill all fields before sending the request.');
    return false;
  }

  // Bot mitigation checks
  // 1. Honeypot check - bots often fill hidden fields
  if (honeypot) {
    console.warn('Bot detected: honeypot filled');
    return false;
  }

  // 2. Timing check - bots submit forms too quickly (< 800ms)
  const timeSinceLoad = Date.now() - formLoadTime;
  if (timeSinceLoad < 800) {
    console.warn('Bot detected: form submitted too quickly');
    return false;
  }

  // 3. Basic input sanitization - check for suspicious patterns
  const suspiciousPatterns = /<script|javascript:|onerror=|onclick=/i;
  if (
    suspiciousPatterns.test(name) ||
    suspiciousPatterns.test(subject) ||
    suspiciousPatterns.test(message)
  ) {
    alert('Invalid input detected. Please remove any special characters or scripts.');
    return false;
  }

  submitBtn.disabled = true;
  btnText.style.display = 'none';
  btnLoading.style.display = 'inline';
  confirmEl.style.display = 'none';

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();

    if (data.success) {
      successMsg.style.display = 'block';
      errorMsg.style.display = 'none';
      confirmEl.style.display = 'block';
      form.reset();

      // Re-initialize Materialize labels
      setTimeout(() => {
        form.querySelectorAll('label').forEach((label) => label.classList.remove('active'));
      }, 100);
    } else {
      throw new Error('Submission failed');
    }
  } catch (err) {
    console.error('Error:', err);
    successMsg.style.display = 'none';
    errorMsg.style.display = 'block';
    confirmEl.style.display = 'block';
  } finally {
    submitBtn.disabled = false;
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
  }

  return false;
}
