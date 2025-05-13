import { Suspense } from 'react';
import { UserProvider } from './context/UserContext';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import MainView from './layouts/MainView';
import mainRoutes from './route/mainRoutes';
import loginRoutes from './route/loginRoutes';
import LoopLoading from './components/common/LoopLoading';

const router = createBrowserRouter([
  {
    path: '/',
    children: [...mainRoutes, ...loginRoutes],
  },
]);

export default function App() {
  return (
    <UserProvider>
      <Suspense
        fallback={
          <MainView className="flex h-screen w-full items-center justify-center">
            <LoopLoading />
          </MainView>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </UserProvider>
  );
}
