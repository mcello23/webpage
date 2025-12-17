import { useEffect, useState } from 'react';

const Contact = () => {
  const [formLoadTime, setFormLoadTime] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  useEffect(() => {
    setFormLoadTime(Date.now());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const form = e.target;
    const formData = new FormData(form);
    const honeypot = formData.get('botcheck');

    // Bot mitigation checks
    if (honeypot) {
      console.warn('Bot detected: honeypot filled');
      setIsSubmitting(false);
      return;
    }

    const timeSinceLoad = Date.now() - formLoadTime;
    if (timeSinceLoad < 800) {
      console.warn('Bot detected: form submitted too quickly');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        form.reset();
      } else {
        setSubmitStatus('error');
        console.error('Form submission failed:', data);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Send Message Banner */}
      <div
        className="parallax-container valign-wrapper parallax-fundamentals"
        style={{ minHeight: '250px' }}
      >
        <div className="section no-pad-bot" style={{ width: '100%' }}>
          <div className="container">
            <div className="row center">
              <h3
                className="header col s12 white-text"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', fontWeight: 700 }}
              >
                Send me a Message
              </h3>
              <p
                className="flow-text white-text"
                style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)' }}
              >
                Let's connect and discuss your testing needs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <section
        id="contact"
        className="section"
        style={{ padding: '48px 0', background: 'linear-gradient(180deg, #fff, #fbfdff)' }}
      >
        <div className="container">
          <div className="row">
            <div className="col s12 m8 offset-m2">
              <div className="card gradient-card">
                <div className="card-content">
                  <form id="cv-form" onSubmit={handleSubmit} aria-labelledby="cv-form-title">
                    <h3 id="cv-form-title" className="sr-only">
                      Send me a message
                    </h3>

                    <input
                      type="hidden"
                      name="access_key"
                      value="9b0257eb-d6be-4449-9eeb-af664f2bec38"
                    />
                    <input type="hidden" name="subject" value="Message from Portfolio" />
                    <input type="hidden" name="from_name" value="Portfolio Contact Form" />

                    {/* Honeypot field for bot detection */}
                    <input
                      type="text"
                      name="botcheck"
                      id="botcheck"
                      style={{ position: 'absolute', left: '-9999px' }}
                      tabIndex="-1"
                      autoComplete="off"
                      aria-hidden="true"
                    />

                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          id="cv-email"
                          name="email"
                          type="email"
                          required
                          aria-required="true"
                          autoComplete="email"
                        />
                        <label htmlFor="cv-email">Your Email</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          id="cv-name"
                          name="name"
                          type="text"
                          required
                          aria-required="true"
                          autoComplete="name"
                        />
                        <label htmlFor="cv-name">Your Name</label>
                      </div>
                    </div>

                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          id="cv-subject"
                          name="request_subject"
                          type="text"
                          required
                          aria-required="true"
                        />
                        <label htmlFor="cv-subject">Subject</label>
                      </div>
                    </div>

                    <div className="row">
                      <div className="input-field col s12">
                        <textarea
                          id="cv-message"
                          name="message"
                          className="materialize-textarea"
                          rows="4"
                          required
                          aria-required="true"
                        ></textarea>
                        <label htmlFor="cv-message">Message</label>
                      </div>
                    </div>

                    <div className="row" style={{ alignItems: 'center' }}>
                      <div className="col s12 m6">
                        <button
                          type="submit"
                          id="submit-btn"
                          className="btn-large waves-effect waves-light teal"
                          aria-live="polite"
                          disabled={isSubmitting}
                          style={{ borderRadius: '8px' }}
                        >
                          {isSubmitting ? (
                            <span id="btn-loading">Sending...</span>
                          ) : (
                            <span id="btn-text">Send message</span>
                          )}
                        </button>
                      </div>
                      <div className="col s12 m6">
                        <div
                          id="cv-confirm"
                          style={{
                            display: submitStatus ? 'block' : 'none',
                            fontWeight: 600,
                            marginTop: '10px',
                          }}
                        >
                          {submitStatus === 'success' && (
                            <span id="success-msg" style={{ color: '#2e7d32' }}>
                              ✓ Message sent successfully! I’ll respond shortly.
                            </span>
                          )}
                          {submitStatus === 'error' && (
                            <span id="error-msg" style={{ color: '#c62828' }}>
                              ✗ Failed to send. Please try again or contact me on LinkedIn.
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
