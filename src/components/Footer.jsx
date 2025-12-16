const Footer = () => {
  return (
    <div
      className="section"
      style={{
        padding: '60px 0',
        background: 'linear-gradient(135deg, var(--brand-1) 0%, var(--brand-2) 100%)',
      }}
    >
      <div className="container">
        <div className="row center">
          <div className="col s12">
            <h3 className="white-text">Thanks for exploring my testing portfolio</h3>
            <p className="flow-text white-text">
              Ready to build robust, scalable testing solutions together
            </p>
            <div style={{ marginTop: '30px' }}>
              <a
                href="https://www.linkedin.com/in/marceloc/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-large white teal-text waves-effect"
                style={{ margin: '10px', borderRadius: '25px' }}
              >
                <i className="fab fa-linkedin left" aria-hidden="true"></i>Let's Connect
              </a>
              <a
                href="https://calendly.com/marceloadsc/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-large white teal-text waves-effect"
                style={{ margin: '10px', borderRadius: '25px' }}
              >
                <i className="material-icons left" aria-hidden="true">
                  event
                </i>
                Book 15-min Call
              </a>
              <a
                href="#contact"
                className="btn-large white teal-text waves-effect"
                style={{ margin: '10px', borderRadius: '25px' }}
              >
                <i className="material-icons left" aria-hidden="true">
                  email
                </i>
                Send Message
              </a>
            </div>
            <p className="white-text" style={{ marginTop: '20px' }}>
              © 2025 Marcelo Costa | Senior QA Engineer & Test Automation Specialist
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
