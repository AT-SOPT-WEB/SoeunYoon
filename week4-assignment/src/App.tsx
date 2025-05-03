import { Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import MainView from './layouts/MainView';
import mainRoutes from './route/mainRoutes';
import LoopLoading from './components/common/LoopLoading';

const router = createBrowserRouter([
  {
    path: '/',
    children: [...mainRoutes],
  },
]);

export default function App() {
  return (
    <Suspense
      fallback={
        <MainView className="flex h-screen w-full items-center justify-center">
          <LoopLoading />
        </MainView>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}
