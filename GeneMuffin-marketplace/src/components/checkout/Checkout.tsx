
import React, { useEffect, useState } from 'react';
import { useCheckout } from '@/context/CheckoutContext';
import { Check, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import ConnectWalletButton from '@/components/wallet/ConnectWalletButton';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { useWalletConnection } from '@/hooks/useWalletConnection';

// Helper function to generate a random transaction hash
const generateTxHash = () => {
  // Create a random transaction hash that looks like an Ethereum transaction
  const chars = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
};

const Checkout: React.FC = () => {
  const { stage, setStage, isWalletConnected, setWalletConnected, transactionHash, setTransactionHash } = useCheckout();
  const { items, totalPrice } = useCart();
  const [progress, setProgress] = useState(0);
  const { isConnected, setIsOpen } = useWalletConnection();

  // Synchronize wallet connection state between contexts
  useEffect(() => {
    if (isConnected !== isWalletConnected) {
      setWalletConnected(isConnected);
    }
  }, [isConnected, isWalletConnected, setWalletConnected]);

  useEffect(() => {
    if (isWalletConnected && stage === 'wallet-connection') {
      setStage('shipping');
    }
  }, [isWalletConnected, stage, setStage]);

  useEffect(() => {
    if (stage === 'transaction') {
      setProgress(0);
      
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            const txHash = generateTxHash();
            setTransactionHash(txHash);
            setStage('confirmation');
            toast.success("Transaction completed successfully!");
            return 100;
          }
          return prev + (100 / 8) * 0.1;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [stage, setStage, setTransactionHash]);

  const handleWalletConnected = () => {
    setWalletConnected(true);
  };

  const formatPrice = (price: number) => {
    return `${price} ETH`;
  };

  const displayTotal = formatPrice(totalPrice);

  const openWalletDialog = () => {
    setIsOpen(true);
  };

  if (stage === 'wallet-connection') {
    return (
      <div className="flex flex-col items-center py-6">
        <h2 className="text-xl font-semibold mb-6">Connect Your Wallet to Continue</h2>
        
        <div className="mb-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Order Total:</span>
            <span className="font-bold">{displayTotal}</span>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <div className="text-sm text-gray-600 mb-4">
              Connecting your wallet allows for secure blockchain-based transactions 
              for your genetic data and DNA test kit purchases.
            </div>
          </div>
        </div>
        
        <div className="w-full max-w-md flex justify-center">
          <Button 
            className="bg-gene hover:bg-gene/90 text-white"
            onClick={openWalletDialog}
          >
            Connect Your Wallet
          </Button>
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => setStage('cart')} 
          className="mt-4"
        >
          Return to Cart
        </Button>
      </div>
    );
  }

  if (stage === 'shipping') {
    return (
      <div className="py-6">
        <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
        
        <div className="bg-green-50 rounded-md p-4 mb-6 flex items-center">
          <Check className="text-green-600 mr-2 h-5 w-5" />
          <span>Wallet connected successfully</span>
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input type="text" className="w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input type="text" className="w-full p-2 border rounded-md" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input type="text" className="w-full p-2 border rounded-md" />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input type="text" className="w-full p-2 border rounded-md" />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input type="text" className="w-full p-2 border rounded-md" />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">ZIP</label>
              <input type="text" className="w-full p-2 border rounded-md" />
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStage('cart')}>
            Back
          </Button>
          <Button onClick={() => setStage('payment')} className="bg-blue-600 hover:bg-blue-700">
            Continue to Payment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  if (stage === 'payment') {
    return (
      <div className="py-6">
        <h2 className="text-xl font-semibold mb-6">Payment Details</h2>
        
        <div className="bg-green-50 rounded-md p-4 mb-6 flex items-center">
          <Check className="text-green-600 mr-2 h-5 w-5" />
          <span>Wallet connected - Payment will be processed securely via blockchain</span>
        </div>
        
        <div className="mb-6">
          <h3 className="font-medium mb-2">Order Summary</h3>
          <div className="border rounded-md p-4">
            {items.map(item => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>{item.quantity}x {item.name}</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="border-t mt-2 pt-2 font-bold flex justify-between">
              <span>Total</span>
              <span>{displayTotal}</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStage('shipping')}>
            Back
          </Button>
          <Button onClick={() => setStage('transaction')} className="bg-gene hover:bg-gene/90">
            Complete Purchase
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  if (stage === 'transaction') {
    return (
      <div className="py-8 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-8">Processing Transaction</h2>
        
        <div className="w-full max-w-md mb-8">
          <div className="mb-2 flex justify-between text-sm font-medium">
            <span>Transaction in progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-100" />
        </div>
        
        <div className="flex flex-col items-center space-y-4 text-center mb-6">
          <div className="animate-spin">
            <Loader2 className="h-12 w-12 text-gene" />
          </div>
          <p className="text-gray-600 max-w-md">
            Your transaction is being processed on the blockchain. This typically takes a few seconds.
            Please don't close this window.
          </p>
        </div>
        
        <div className="border rounded-md p-6 w-full max-w-md">
          <h3 className="font-medium mb-4 text-sm uppercase tracking-wider text-gray-500">Transaction Details</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium text-amber-500">Pending</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Network:</span>
              <span>Ethereum Mainnet</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium">{displayTotal}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'confirmation') {
    return (
      <div className="py-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Transaction Completed!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your blockchain transaction has been processed successfully.
        </p>
        
        <div className="border rounded-md p-6 mb-6 text-left max-w-md mx-auto">
          <h3 className="font-medium mb-4">Transaction Details</h3>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Transaction ID:</span>
              <div className="flex items-center">
                <span className="font-mono text-sm">{transactionHash.substring(0, 6)}...{transactionHash.substring(transactionHash.length - 4)}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 ml-1"
                  onClick={() => {
                    navigator.clipboard.writeText(transactionHash);
                    toast.success("Transaction hash copied to clipboard");
                  }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16V4a2 2 0 0 1 2-2h10" />
                  </svg>
                </Button>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="text-green-600 font-medium">Confirmed</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span>{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total:</span>
              <span className="font-bold">{displayTotal}</span>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600">
              A confirmation email with tracking information will be sent to your registered email address.
            </p>
          </div>
        </div>
        
        <Button className="bg-gene hover:bg-gene/90 text-white">
          Return to Marketplace
        </Button>
      </div>
    );
  }

  return null;
};

export default Checkout;
