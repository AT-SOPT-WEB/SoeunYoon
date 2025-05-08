import { lazy } from 'react';

import { RouteObject } from 'react-router-dom';

const MyInfo = lazy(() => import('../pages/MyInfo'));
const Search = lazy(() => import('../pages/Search'));
const Layout = lazy(() => import('../layouts/Layout'));

const mainRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'mypage/info',
        element: <MyInfo />,
      },
      {
        path: 'mypage/search',
        element: <Search />,
      },
    ],
  },
];

export default mainRoutes;
