import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import FilePath from './Components/Root/FilePath'
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <FilePath />
      <ToastContainer position='top-center' autoClose={1500} />
    </BrowserRouter>
  </StrictMode>,
)
