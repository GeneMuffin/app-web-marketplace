
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const location = useLocation();

  // Page transition effect
  useEffect(() => {
    setIsMounted(false);
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black">
      <Sidebar />
      <div className="md:pl-64">
        <Header />
        <main className={cn(
          "container py-6 px-4 md:px-6 transition-opacity duration-300 ease-in-out bg-black",
          isMounted ? "opacity-100" : "opacity-0"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
