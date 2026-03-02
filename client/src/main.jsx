import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <--- 1. Import BrowserRouter
import App from './App.jsx';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <CartProvider>
        {/* 2. Bọc BrowserRouter quanh App */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </HelmetProvider>
  </React.StrictMode>,
);