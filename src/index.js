import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css'; // Importar estilos globais

const rootElement = document.getElementById('root');

// Renderizar a mensagem noscript se JavaScript não estiver habilitado
if (!rootElement) {
  const noscript = document.createElement('noscript');
  noscript.textContent = 'You need to enable JavaScript to run this app.';
  document.body.appendChild(noscript);
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}
