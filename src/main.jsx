import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import FilePath from './Components/Root/FilePath'
import "bootstrap-icons/font/bootstrap-icons.css";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <FilePath />
    </BrowserRouter>
  </StrictMode>,
)
