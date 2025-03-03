import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ReactNotifications } from 'react-notifications-component'
import "react-notifications-component/dist/theme.css";
import ContextApis from './contextApi/ContextApis.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextApis>
      <BrowserRouter>
      <ReactNotifications/>
        <App />
      </BrowserRouter>
    </ContextApis>
  </StrictMode>,
)
