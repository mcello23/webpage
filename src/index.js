import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './pages/HomePage'; // Importe o componente HomePage


ReactDOM.render(
 <React.StrictMode>
 <HomePage /> {/* Renderize o componente HomePage */}
 </React.StrictMode>,
 document.getElementById('root')
);