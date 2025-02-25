import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import 'tailwind.css';   // Import Tailwind styles
import './index.css'; 
import './App.scss';    
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
