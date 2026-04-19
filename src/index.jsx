import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');

root.render(
  <BrowserRouter basename={baseUrl || undefined}>
    <App />
  </BrowserRouter>);
