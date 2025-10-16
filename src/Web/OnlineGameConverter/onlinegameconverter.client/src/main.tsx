import { StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AppBackup from './Backup/AppBackup.tsx'
//import { getTarget } from "../UserConfig.ts"
import { NodeTest } from './Test/NodeTest.tsx'
//import AppBackup from './Backup/AppBackup.tsx'
const indexedDB = window.indexedDB;
const node = (): ReactNode => {
    return <><StrictMode>
        <App />
    </StrictMode></>

}

createRoot(document.getElementById('root')!).render(node()
)

/*
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppBackup />
    </StrictMode>
)*/