import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Quiz from './pages/Quiz.jsx'
import Results from './pages/Results.jsx'
import './styles.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Quiz /> },
      { path: 'quiz', element: <Quiz /> },
      { path: 'results', element: <Results /> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
