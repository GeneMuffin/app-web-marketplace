
import React from 'react';
import { WalletIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { useCart } from '@/context/CartContext';
import WalletConnectionDialog from './WalletConnectionDialog';
import WalletPopover from './WalletPopover';
import { useWalletConnection } from '@/hooks/useWalletConnection';

interface ConnectWalletButtonProps {
  compact?: boolean;
}

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({ compact = false }) => {
  const { 
    isOpen, 
    setIsOpen,
    isConnecting,
    setIsConnecting, 
    selectedWallet, 
    setSelectedWallet,
    isSuccess,
    setIsSuccess,
    activeTab,
    setActiveTab,
    walletActiveTab,
    setWalletActiveTab,
    isConnected,
    walletAddress,
    networkName,
    ethBalance,
    handleConnect,
    handleDisconnect
  } = useWalletConnection();
  
  const { totalItems } = useCart();

  return (
    <>
      {isConnected ? (
        <WalletPopover
          walletAddress={walletAddress}
          selectedWallet={selectedWallet}
          ethBalance={ethBalance}
          networkName={networkName}
          walletActiveTab={walletActiveTab}
          setWalletActiveTab={setWalletActiveTab}
          handleDisconnect={handleDisconnect}
          compact={compact}
          totalItems={totalItems}
        />
      ) : (
        compact ? (
          <Button 
            id="wallet-button-trigger"
            onClick={() => setIsOpen(true)} 
            variant="outline"
            size="icon"
            className="w-8 h-8 p-0 bg-black border border-gray-800 hover:bg-gray-900"
          >
            <WalletIcon className="h-4 w-4 text-[#ffb8aa]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 rounded-full bg-blue-600 text-white text-[10px]">
                {totalItems}
              </span>
            )}
          </Button>
        ) : (
          <ShimmerButton 
            id="wallet-button-trigger"
            onClick={() => setIsOpen(true)}
            className="h-10 py-0 px-4 text-white"
            shimmerColor="#ffb8aa33"
            background="rgba(0, 0, 0, 0.7)"
          >
            <div className="flex items-center text-white">
              <WalletIcon className="mr-2 h-4 w-4" />
              <span>Connect Wallet</span>
            </div>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </ShimmerButton>
        )
      )}
      
      <WalletConnectionDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isConnecting={isConnecting}
        setIsConnecting={setIsConnecting}
        selectedWallet={selectedWallet}
        setSelectedWallet={setSelectedWallet}
        isSuccess={isSuccess}
        setIsSuccess={setIsSuccess}
        handleConnect={handleConnect}
        totalItems={totalItems}
      />
    </>
  );
};

export default ConnectWalletButton;
