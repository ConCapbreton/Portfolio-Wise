import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom"
import { Router } from "./routes/Router"

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <RouterProvider router={Router} />
  </StrictMode>
)