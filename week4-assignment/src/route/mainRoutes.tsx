import { lazy } from 'react';

import { RouteObject } from 'react-router-dom';

const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
const Mypage = lazy(() => import('../pages/Mypage'));
const Layout = lazy(() => import('../layouts/Layout'));

const mainRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Mypage />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
    ],
  },
];

export default mainRoutes;
