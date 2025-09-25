import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AppBackup from './Backup/AppBackup.tsx'
//import AppBackup from './Backup/AppBackup.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
   </StrictMode>
)

/*
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppBackup />
    </StrictMode>
)*/