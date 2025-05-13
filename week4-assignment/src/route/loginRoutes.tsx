import { lazy } from 'react';

import { RouteObject } from 'react-router-dom';

const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));

const loginRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: 'signup',
    element: <Signup />,
  },
];

export default loginRoutes;
