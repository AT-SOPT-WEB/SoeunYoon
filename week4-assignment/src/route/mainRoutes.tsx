import { lazy, useEffect } from 'react';
import { useNavigate, RouteObject } from 'react-router-dom';

const MyInfo = lazy(() => import('../pages/MyInfo'));
const Search = lazy(() => import('../pages/Search'));
const Layout = lazy(() => import('../layouts/Layout'));

const RedirectRoot = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('userId');
    navigate(token ? '/mypage/info' : '/login', { replace: true });
  }, [navigate]);

  return null;
};

const mainRoutes: RouteObject[] = [
  {
    path: '/',
    element: <RedirectRoot />,
  },
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
