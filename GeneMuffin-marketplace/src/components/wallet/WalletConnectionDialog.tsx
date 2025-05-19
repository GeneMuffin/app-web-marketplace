
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { walletOptions } from './WalletTypes';
import CartTabContent from './tabs/CartTabContent';
import { useCheckout } from '@/context/CheckoutContext';

interface WalletConnectionDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isConnecting: boolean;
  setIsConnecting: (connecting: boolean) => void;
  selectedWallet: string | null;
  setSelectedWallet: (wallet: string | null) => void;
  isSuccess: boolean;
  setIsSuccess: (success: boolean) => void;
  handleConnect: (walletId: string) => void;
  totalItems: number;
}

const WalletConnectionDialog: React.FC<WalletConnectionDialogProps> = ({
  isOpen,
  setIsOpen,
  activeTab,
  setActiveTab,
  isConnecting,
  setIsConnecting,
  selectedWallet,
  setSelectedWallet,
  isSuccess,
  setIsSuccess,
  handleConnect,
  totalItems
}) => {
  const { proceedToCheckout, isWalletConnected } = useCheckout();

  const handleProceedToCheckout = () => {
    if (isWalletConnected) {
      proceedToCheckout();
    } else {
      proceedToCheckout();
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 text-gray-100">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-xl font-bold text-white">Connect Your Wallet</DialogTitle>
          <DialogDescription className="text-gray-400">
            Choose a wallet to connect and manage your assets
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="wallet" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 mt-6">
            <TabsList className="w-full grid grid-cols-2 p-1 bg-gray-800 rounded-md">
              <TabsTrigger 
                value="wallet" 
                className="rounded-md data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                Connect Wallet
              </TabsTrigger>
              <TabsTrigger 
                value="cart" 
                data-value="cart"
                className="rounded-md data-[state=active]:bg-gray-700 data-[state=active]:text-white relative"
              >
                Cart
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="px-6 pb-6">
            <TabsContent value="wallet" className="mt-6 focus-visible:outline-none focus-visible:ring-0">
              {!isSuccess ? (
                <div className="grid gap-3">
                  {walletOptions.map(wallet => (
                    <Button 
                      key={wallet.id} 
                      variant="outline" 
                      className={cn(
                        "flex justify-between items-center h-16 px-4 bg-gray-800/50 border-gray-700 hover:bg-gray-700/80 backdrop-blur-sm rounded-xl",
                        isConnecting && selectedWallet === wallet.id ? 'border-blue-500 bg-blue-500/10' : ''
                      )}
                      disabled={isConnecting} 
                      onClick={() => handleConnect(wallet.id)}
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3 p-2">
                          <img src={wallet.logo} alt={wallet.name} className="w-full h-full" />
                        </div>
                        <span className="font-medium">{wallet.name}</span>
                      </div>
                      
                      {isConnecting && selectedWallet === wallet.id && (
                        <div className="flex space-x-1">
                          <div className="loading-dot w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>
                          <div className="loading-dot w-2 h-2 rounded-full bg-blue-500 animate-ping" style={{animationDelay: '0.2s'}}></div>
                          <div className="loading-dot w-2 h-2 rounded-full bg-blue-500 animate-ping" style={{animationDelay: '0.4s'}}></div>
                        </div>
                      )}
                    </Button>
                  ))}
                  
                  <div className="mt-3 pt-3 border-t border-gray-700/50">
                    <p className="text-xs text-gray-400 text-center">
                      By connecting, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1">Connection Successful</h3>
                  <p className="text-gray-400 text-center">Your wallet has been connected and your data license has been approved</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="cart" className="mt-6 focus-visible:outline-none focus-visible:ring-0">
              <CartTabContent handleProceedToCheckout={handleProceedToCheckout} />
            </TabsContent>
          </div>
        </Tabs>
        
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-4 p-6 pt-0 bg-transparent">
          {!isSuccess && activeTab === "wallet" && (
            <Button 
              variant="ghost" 
              onClick={() => setIsOpen(false)} 
              disabled={isConnecting}
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              Cancel
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnectionDialog;
