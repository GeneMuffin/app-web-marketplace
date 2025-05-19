
import React from 'react';
import { ShoppingCart, Plus, Minus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '../WalletUtils';

interface CartTabContentProps {
  handleProceedToCheckout?: () => void;
  inDialog?: boolean;
}

const CartTabContent: React.FC<CartTabContentProps> = ({ 
  handleProceedToCheckout,
  inDialog = false 
}) => {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <div className="p-3">
      {items.length === 0 ? (
        <div className="py-8 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
            <ShoppingCart className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-1">Your cart is empty</h3>
          <p className="text-gray-400">Start adding items to your cart!</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col divide-y divide-gray-700/50">
            {items.map((item) => (
              <div key={item.id} className="py-4 flex">
                <div className={`${inDialog ? 'h-20 w-20' : 'h-16 w-16'} flex-shrink-0 overflow-hidden rounded-md border border-gray-700`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                
                <div className="ml-4 flex flex-1 flex-col">
                  <div className="flex justify-between text-base font-medium text-white">
                    <h3 className={inDialog ? "" : "text-sm"}>{item.name}</h3>
                    <p className="ml-4">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm mt-2">
                    <div className="flex items-center border border-gray-700 rounded-md bg-gray-800">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 px-2 text-gray-300 hover:text-white"
                      >
                        <Minus className={`${inDialog ? 'h-4 w-4' : 'h-3 w-3'}`} />
                      </button>
                      <span className={`px-2 text-gray-300 ${inDialog ? '' : 'text-xs'}`}>{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 px-2 text-gray-300 hover:text-white"
                      >
                        <Plus className={`${inDialog ? 'h-4 w-4' : 'h-3 w-3'}`} />
                      </button>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className={`font-medium text-blue-400 hover:text-blue-300 ${inDialog ? '' : 'text-xs'}`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className={`border-t border-gray-700/50 ${inDialog ? 'py-4' : 'py-3'}`}>
            <div className="flex justify-between text-base font-medium text-white mb-4">
              <p>Subtotal</p>
              <p>{formatPrice(totalPrice)}</p>
            </div>
            {handleProceedToCheckout && (
              <Button 
                className={`w-full ${inDialog 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400' 
                  : 'bg-gradient-to-r from-[#8B5CF6] to-[#6c3137] hover:from-[#9d6aff] hover:to-[#7d3940]'} 
                  text-white border-0`}
                onClick={handleProceedToCheckout}
              >
                Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CartTabContent;
