import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

// Legacy CSS imports
import './styles/certificates.min.css';
import './styles/cookie-consent.min.css';
import './styles/materialize.min.css';
import './styles/navbar.min.css';
import './styles/prism.css';
import './styles/style.min.css';
import './styles/test-dashboard.min.css';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
