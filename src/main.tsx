import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom';
import { Cart } from './pages/Cart/Cart';
import { Error } from './pages/Error/Error';
import { Layout } from './layouts/Layout/Layout.tsx';
import Product from './pages/Product/Product.tsx';
import { PREFIX } from './helpers/API.ts';
import axios from 'axios';
import { AuthLayout } from './layouts/AuthLayout/AuthLayout.tsx';
import { LoginPage } from './pages/LoginPage/LoginPage.tsx';
import { RegisterPage } from './pages/RegisterPage/RegisterPage.tsx';
import { RequireAuth } from './helpers/RequireAuth.tsx';

// Для ленивой загрузки страницы с меню, импортируем только при переходе на нее
const LazyMenuPage = lazy(() => import('./pages/Menu/Menu'));

// Описываем роуты к страницам, ниже добавляем RouterProvider
const router = createBrowserRouter([
  // Auth
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: '*',
        element: <Error />
      }
    ],
    errorElement: <Error />
  },

  // Общий layout после авторизации
  {
    path: "/",
    element: <RequireAuth><Layout /> </RequireAuth>,

    // Вложенные роуты, будут отображаться в <Outlet />
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<>Page is Loading...</>}>
            <LazyMenuPage />
          </Suspense>
        ),
      },

      { path: "/cart", element: <Cart /> },

      // Роут на страницу продукта, используя его id
      {
        path: "/product/:id",
        element: <Product />,

        // Предзагружаем данные ассинхронно
        loader: async ({ params }) => {
          // используем defer для получения ассинхронных данных и возврата свойства data
          return defer({
            // получаем результат используя параметры (params) строки роута
            data: await axios
              .get(`${PREFIX}/products/${params.id}`)
              .then((data) => data),
          });
        },

        // Выводим при ошибке
        errorElement: <>Error, we have a problem</>,
      },
    ],
  },

  // Обработка других, не зарегистрированных путей
  { path: "*", element: <Error /> },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
)
