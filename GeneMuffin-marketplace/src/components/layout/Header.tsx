
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, HelpCircle, Settings, LogOut, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import ConnectWalletButton from '@/components/wallet/ConnectWalletButton';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { navItems } from './Sidebar';

const Header = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  return (
    <header className="sticky top-0 z-30 bg-black border-b border-gray-800 backdrop-blur-md backdrop-filter">
      <div className="container flex items-center justify-between h-16 p-4 md:px-6">
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] p-0 bg-black dark:bg-black border-r border-[#6c3137]">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-gray-800">
                  <Link to="/" className="flex items-center gap-2">
                    <img 
                      src="/images/Genemuffin-Logo-s.png" 
                      alt="GeneMuffin Logo" 
                      className="h-8 logo-inverted"
                    />
                  </Link>
                </div>
                <nav className="flex-1 overflow-auto py-4">
                  <ul className="space-y-1 px-2">
                    {navItems.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.path}
                          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-800 hover:text-gray-100"
                        >
                          {item.icon}
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                
                {/* Bottom navigation items */}
                <div className="border-t border-gray-800 py-4 px-2">
                  <ul className="space-y-1">
                    <li>
                      <Link
                        to="/help"
                        className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-800 hover:text-gray-100"
                      >
                        <HelpCircle className="h-5 w-5" />
                        Help
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/settings"
                        className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-800 hover:text-gray-100"
                      >
                        <Settings className="h-5 w-5" />
                        Settings
                      </Link>
                    </li>
                    <li>
                      <button
                        className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-800 hover:text-gray-100"
                      >
                        <LogOut className="h-5 w-5" />
                        Log out
                      </button>
                    </li>
                  </ul>
                  
                  {/* Copyright notice */}
                  <div className="mt-6 px-3 text-xs text-gray-500 flex items-center">
                    <Info className="h-3 w-3 mr-1" />
                    <span>© 2025 GeneMuffin.com. All rights reserved.</span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
        
        {/* Logo - Only visible on mobile */}
        <div className={`flex-none mr-2 md:mr-4 ${isMobile ? 'block' : 'hidden'}`}>
          <Link to="/">
            <img 
              src="/images/Genemuffin-Logo-s.png" 
              alt="GeneMuffin Logo" 
              className="h-7 md:h-8 logo-inverted" 
            />
          </Link>
        </div>
        
        {/* Middle section: Search - Hide on mobile */}
        <div className={`${isMobile ? 'hidden' : 'flex w-1/3'} mx-2 md:mx-4 flex-1 items-center relative`}>
          <form onSubmit={handleSearch} className="w-full relative flex items-center">
            <Search className="text-muted-foreground absolute left-2 md:left-3 h-3 md:h-4 w-3 md:w-4" />
            <Input 
              placeholder="Search gene marketplace..." 
              className="pl-7 md:pl-10 pr-7 md:pr-10 py-1 h-8 md:h-10 text-xs md:text-sm bg-gray-900/50 border-gray-800 focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              size="sm" 
              variant="ghost" 
              className="absolute right-0 md:right-1 h-6 md:h-7 w-6 md:w-7 p-0 text-primary"
            >
              <Search className="h-3 md:h-4 w-3 md:w-4" />
            </Button>
          </form>
        </div>
        
        {/* Right section: Only ConnectWalletButton */}
        <div className="flex items-center gap-2">
          {isMobile ? (
            <ConnectWalletButton compact={true} />
          ) : (
            <ConnectWalletButton />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
