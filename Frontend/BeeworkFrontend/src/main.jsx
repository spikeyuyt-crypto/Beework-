import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './router/index.jsx'
import { RouterProvider } from 'react-router-dom'
import './css/A0301.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
