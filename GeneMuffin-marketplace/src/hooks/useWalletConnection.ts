import { useState, useEffect } from 'react';
import { useCheckout } from '@/context/CheckoutContext';

export function useWalletConnection() {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("wallet");
  const [walletActiveTab, setWalletActiveTab] = useState<string>("assets");
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [networkName, setNetworkName] = useState("Ethereum");
  const [ethBalance, setEthBalance] = useState("1.234");
  
  const { setWalletConnected: setContextWalletConnected } = useCheckout();

  useEffect(() => {
    setContextWalletConnected(isConnected);
  }, [isConnected, setContextWalletConnected]);

  const handleConnect = (walletId: string) => {
    setSelectedWallet(walletId);
    setIsConnecting(true);

    setTimeout(() => {
      setIsConnecting(false);
      setIsSuccess(true);

      const randomAddress = "0x" + Array.from({length: 40}, () => 
        Math.floor(Math.random() * 16).toString(16)).join('');
      setWalletAddress(randomAddress);

      setTimeout(() => {
        setIsSuccess(false);
        setIsOpen(false);
        setIsConnected(true);
        setContextWalletConnected(true);
      }, 2000);
    }, 1500);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress("");
    setSelectedWallet(null);
    setContextWalletConnected(false);
  };

  return {
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
  };
}
