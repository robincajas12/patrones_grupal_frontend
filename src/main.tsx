import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { PianoApp } from './PianoApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/*<PianoApp />*/}
      <App></App>
    </BrowserRouter>
  </StrictMode>,
)
