import { lazy } from 'react';

import { RouteObject } from 'react-router-dom';

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
    ],
  },
];

export default mainRoutes;
