import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.tsx'
import { OptimizedChart } from './Library/AppChart.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <OptimizedChart />
  </StrictMode>,
)
