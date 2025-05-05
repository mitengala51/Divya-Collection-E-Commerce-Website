import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <GoogleOAuthProvider clientId="446914107859-cqu5jep6421jpij2d8s9j386c0295b2l.apps.googleusercontent.com">
      <App />
  </GoogleOAuthProvider>
  </BrowserRouter>
  </StrictMode>,
)
