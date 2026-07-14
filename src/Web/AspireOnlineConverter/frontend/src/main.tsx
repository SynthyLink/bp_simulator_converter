import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
console.log(1)
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
  </StrictMode>,
);
