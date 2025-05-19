
import React, { createContext, useContext, useState } from 'react';
import { useCart } from './CartContext';

type CheckoutStage = 'cart' | 'wallet-connection' | 'shipping' | 'payment' | 'transaction' | 'confirmation';

interface CheckoutContextType {
  stage: CheckoutStage;
  setStage: (stage: CheckoutStage) => void;
  isWalletConnected: boolean;
  setWalletConnected: (connected: boolean) => void;
  proceedToCheckout: () => void;
  proceedToTransaction: () => void;
  resetCheckout: () => void;
  transactionHash: string;
  setTransactionHash: (hash: string) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stage, setStage] = useState<CheckoutStage>('cart');
  const [isWalletConnected, setWalletConnected] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const { clearCart } = useCart();

  const proceedToCheckout = () => {
    if (!isWalletConnected) {
      setStage('wallet-connection');
    } else {
      setStage('shipping');
    }
  };

  const proceedToTransaction = () => {
    setStage('transaction');
  };

  const resetCheckout = () => {
    setStage('cart');
    clearCart();
  };

  return (
    <CheckoutContext.Provider 
      value={{ 
        stage, 
        setStage, 
        isWalletConnected, 
        setWalletConnected, 
        proceedToCheckout,
        proceedToTransaction,
        resetCheckout,
        transactionHash,
        setTransactionHash
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};
