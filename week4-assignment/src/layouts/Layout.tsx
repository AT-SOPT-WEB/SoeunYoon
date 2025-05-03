import { ReactNode } from 'react';

import { Outlet } from 'react-router-dom';

import Header from './Header';

interface LayoutProps {
  children?: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto flex min-h-screen bg-bg w-full flex-col bg-white">
      <Header />
      <div className="flex-1 pt-[72px]">{children || <Outlet />}</div>
    </div>
  );
}

