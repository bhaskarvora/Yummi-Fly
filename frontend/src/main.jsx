import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import StoredContextProvider from './context/StoredContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoredContextProvider>
      <App />
    </StoredContextProvider>
  

  </BrowserRouter>

    
)
