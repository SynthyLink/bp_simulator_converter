import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
//import AppOld from './AppOld.tsx';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
  </StrictMode>,
);
