
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutGrid, ShoppingCart, Info, HelpCircle, Settings, LogOut } from 'lucide-react';

export const navItems = [
  { name: 'Dashboard', path: '/', icon: <LayoutGrid className="h-5 w-5" /> },
  { name: 'Marketplace', path: '/marketplace', icon: <ShoppingCart className="h-5 w-5" /> },
  { name: 'About Blockchain', path: '/about', icon: <Info className="h-5 w-5" /> },
];

const bottomNavItems = [
  { name: 'Help', path: '/help', icon: <HelpCircle className="h-5 w-5" /> },
  { name: 'Settings', path: '/settings', icon: <Settings className="h-5 w-5" /> },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-black shadow-sm border-r border-gray-800 fixed left-0 top-0 z-30">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/images/Genemuffin-Logo-s.png" 
            alt="GeneMuffin Logo" 
            className="h-10 logo-inverted"
          />
        </Link>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        <div className="py-2">
          <p className="px-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
            Main Menu
          </p>
          <ul className="mt-2 space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out",
                    location.pathname === item.path
                      ? "bg-gray-800 text-primary"
                      : "text-gray-300 hover:bg-gray-800 hover:text-gray-100"
                  )}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      
      <div className="px-4 py-4 border-t border-gray-800">
        <ul className="space-y-1">
          {bottomNavItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out",
                  location.pathname === item.path
                    ? "bg-gray-800 text-primary"
                    : "text-gray-300 hover:bg-gray-800 hover:text-gray-100"
                )}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <button
              className="flex w-full items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-800 hover:text-gray-100 transition-all duration-200 ease-in-out"
            >
              <span className="mr-3"><LogOut className="h-5 w-5" /></span>
              Log out
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
