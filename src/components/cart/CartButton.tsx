
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const CartButton: React.FC = () => {
  const { totalItems } = useCart();

  const handleClick = () => {
    // Open ConnectWalletButton's dialog directly to cart tab
    const walletButton = document.getElementById('wallet-button-trigger');
    if (walletButton) {
      (walletButton as HTMLButtonElement).click();
      
      // Set a small timeout to ensure the dialog is open before accessing tab elements
      setTimeout(() => {
        const cartTab = document.querySelector('[data-value="cart"]');
        if (cartTab) {
          (cartTab as HTMLButtonElement).click();
        }
      }, 100);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleClick} 
      className="relative"
    >
      <ShoppingCart className="h-4 w-4 mr-1" />
      <span>Cart</span>
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Button>
  );
};

export default CartButton;
