import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { UserProvider } from './components/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </UserProvider>
  </React.StrictMode>,
)
