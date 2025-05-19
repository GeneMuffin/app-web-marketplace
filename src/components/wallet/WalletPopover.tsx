
import React from 'react';
import { WalletIcon, Copy, ExternalLink } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';
import { useCheckout } from '@/context/CheckoutContext';
import AssetsTabContent from './tabs/AssetsTabContent';
import ActivityTabContent from './tabs/ActivityTabContent';
import CartTabContent from './tabs/CartTabContent';
import { shortenAddress } from './WalletUtils';

interface WalletPopoverProps {
  walletAddress: string;
  selectedWallet: string | null;
  ethBalance: string;
  networkName: string;
  walletActiveTab: string;
  setWalletActiveTab: (tab: string) => void;
  handleDisconnect: () => void;
  compact?: boolean;
  totalItems: number;
}

const WalletPopover: React.FC<WalletPopoverProps> = ({
  walletAddress,
  selectedWallet,
  ethBalance,
  networkName,
  walletActiveTab,
  setWalletActiveTab,
  handleDisconnect,
  compact = false,
  totalItems,
}) => {
  const { setStage } = useCheckout();
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Address copied to clipboard");
  };
  
  const openExplorer = () => {
    window.open(`https://etherscan.io/address/${walletAddress}`, '_blank');
  };

  const handleProceedToCheckout = () => {
    setStage('transaction');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {compact ? (
          <Button 
            id="wallet-button-trigger"
            variant="outline" 
            size="icon"
            className="w-8 h-8 p-0 bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-200"
          >
            <WalletIcon className="h-4 w-4 text-[#ffb8aa]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 rounded-full bg-blue-600 text-white text-[10px]">
                {totalItems}
              </span>
            )}
          </Button>
        ) : (
          <Button 
            id="wallet-button-trigger"
            variant="outline" 
            className="flex items-center gap-2 px-3 bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-200"
          >
            <div className="flex items-center">
              <WalletIcon className="h-4 w-4 text-[#ffb8aa]" />
              <span className="ml-2 text-sm font-medium">{shortenAddress(walletAddress)}</span>
            </div>
            {totalItems > 0 && (
              <span className="flex items-center justify-center h-5 w-5 rounded-full bg-blue-600 text-white text-xs">
                {totalItems}
              </span>
            )}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-gradient-to-b from-gray-900 to-gray-800 border border-[#6c3137] text-gray-100">
        <div className="flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-lg text-white">Connected Wallet</h4>
              <div className="flex items-center gap-1 px-2 py-1 bg-[#1A1F2C] rounded-full text-xs text-[#8B5CF6]">
                <span className="h-2 w-2 rounded-full bg-green-400"></span>
                <span>{networkName}</span>
              </div>
            </div>
            <div className="flex items-center mt-3">
              <div className="w-10 h-10 bg-[#1A1F2C] rounded-full flex items-center justify-center p-2 border border-[#6c3137]">
                <img 
                  src={selectedWallet === "metamask" 
                    ? "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                    : selectedWallet === "coinbase" 
                      ? "https://seeklogo.com/images/C/coinbase-coin-logo-C86F46D7B8-seeklogo.com.png"
                      : "https://avatars.githubusercontent.com/u/37784886"} 
                  alt="Wallet logo"
                  className="w-6 h-6"
                />
              </div>
              <div className="ml-3">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-300 truncate">{shortenAddress(walletAddress)}</p>
                  <button 
                    onClick={() => copyToClipboard(walletAddress)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <p className="text-sm font-medium">{ethBalance} ETH</p>
                  <span className="text-xs text-gray-400">($2,345.67)</span>
                </div>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="assets" value={walletActiveTab} onValueChange={setWalletActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 p-1 bg-gray-800/50 rounded-none border-b border-gray-700">
              <TabsTrigger 
                value="assets" 
                className="rounded-none data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-[#8B5CF6]"
              >
                Assets
              </TabsTrigger>
              <TabsTrigger 
                value="activity" 
                className="rounded-none data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-[#8B5CF6]"
              >
                Activity
              </TabsTrigger>
              <TabsTrigger 
                value="cart" 
                className="rounded-none data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-[#8B5CF6] relative"
              >
                Cart
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="assets" className="p-0 focus-visible:outline-none focus-visible:ring-0">
              <AssetsTabContent />
            </TabsContent>
            
            <TabsContent value="activity" className="p-0 focus-visible:outline-none focus-visible:ring-0">
              <ActivityTabContent />
            </TabsContent>
            
            <TabsContent value="cart" className="p-0 focus-visible:outline-none focus-visible:ring-0">
              <CartTabContent handleProceedToCheckout={handleProceedToCheckout} />
            </TabsContent>
          </Tabs>
          
          <div className="p-3 border-t border-gray-700">
            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={openExplorer}
                variant="outline"
                className="w-full bg-tech-dark text-white hover:bg-tech-accent hover:text-white border-gray-700"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Explorer
              </Button>
              <Button 
                onClick={handleDisconnect} 
                variant="destructive" 
                className="w-full"
              >
                Disconnect
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default WalletPopover;
