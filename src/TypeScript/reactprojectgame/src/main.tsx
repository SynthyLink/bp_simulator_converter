import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'


/*
const node = function(): ReactNode {
    return <><StrictMode>
        <App />
    </StrictMode>,</>

}
*/

createRoot(document.getElementById('root')!).render(
     <StrictMode>
         <App />
     </StrictMode>,
) 


/*createRoot(document.getElementById('root')).render(<><StrictMode>
        <App />
    </StrictMode></>)*/

//const canvas: HTMLCanvasElement = document.querySelector("#app");

//funcAirplane(canvas)


