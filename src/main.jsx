import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import FilePath from './Components/Root/FilePath'
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import 'react-phone-input-2/lib/style.css'
import { Provider } from 'react-redux';
import { persistor, store } from './Components/Redux/Store/Store';
import './index.css'
import { PersistGate } from 'redux-persist/integration/react';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <FilePath />
          <ToastContainer position='top-center' autoClose={1500} />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
