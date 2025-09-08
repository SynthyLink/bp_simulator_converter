import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { NodeTTT } from './NodeTTT.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <NodeTTT />
   </StrictMode>
)
