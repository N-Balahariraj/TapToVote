import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './ContextAPIs/AuthContext.jsx'
import {RefreshProvider} from './ContextAPIs/RefreshContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RefreshProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </RefreshProvider>
  </React.StrictMode>,
)
