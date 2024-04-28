import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import PersistApp from './PersistApp';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <PersistApp />
  </React.StrictMode>
);