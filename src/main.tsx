import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Menu } from './pages/Menu/Menu';
import { Cart } from './pages/Cart/Cart';
import { Error } from './pages/Error/Error';

// Описываем роуты к страницам, ниже добавляем RouterProvider
const router = createBrowserRouter([
  { path: '/', element: <Menu /> },
  { path: '/cart', element: <Cart /> },
  { path: '*', element: <Error /> },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <App />
      <RouterProvider router={router} />
  </React.StrictMode>
)
