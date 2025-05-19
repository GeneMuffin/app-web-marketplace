
import React from 'react';
import { ArrowRight, FileSearch, Dna, FileText, Search, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

interface DNATestKitProps {
  className?: string;
}

const DNA_KIT = {
  id: 'dna-test-kit-basic',
  name: 'DNA Test Collection Kit',
  price: 1.99, // Changed to ETH price
  currency: 'ETH', // Added currency specification
  image: '/images/dna-test.png',
};

const DNATestKit: React.FC<DNATestKitProps> = ({ className }) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    addItem({
      id: DNA_KIT.id,
      name: DNA_KIT.name,
      price: DNA_KIT.price,
      quantity: 1,
      image: DNA_KIT.image,
      currency: DNA_KIT.currency, // Pass currency to cart item
    });
    
    toast({
      title: "Added to cart",
      description: `${DNA_KIT.name} has been added to your cart.`,
      variant: "default",
    });
  };
  
  return (
    <div className={className}>
      <motion.div 
        className="tech-card overflow-hidden tech-glow animate-glow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">{DNA_KIT.name}</h2>
            <p className="text-muted-foreground mb-6">
              Advanced DNA, microbiome, sports performance, and ancestry at-home testing kits with personalized reports.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-start">
                <div className="bg-gene/20 dark:bg-gene/10 p-2 rounded-full mr-3">
                  <Dna className="h-5 w-5 text-gene" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">DNA Analysis</h3>
                  <p className="text-sm text-muted-foreground">Comprehensive genetic insights</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-tech-success/20 p-2 rounded-full mr-3">
                  <FileText className="h-5 w-5 text-tech-success" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Detailed Reports</h3>
                  <p className="text-sm text-muted-foreground">Personalized health insights</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-tech-accent/20 p-2 rounded-full mr-3">
                  <FileSearch className="h-5 w-5 text-tech-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Ancestry Tracking</h3>
                  <p className="text-sm text-muted-foreground">Discover your heritage</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-tech-warning/20 p-2 rounded-full mr-3">
                  <Search className="h-5 w-5 text-tech-warning" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Sport Performance</h3>
                  <p className="text-sm text-muted-foreground">Optimize your potential</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-foreground">{DNA_KIT.price} {DNA_KIT.currency}</span>
              <Button 
                className="bg-black hover:bg-black/80 text-white cart-btn-hover"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="mr-1 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
          
          <div className="hidden md:block relative overflow-hidden">
            <div className="absolute inset-0 bg-tech-grid opacity-10"></div>
            <img 
              src={DNA_KIT.image} 
              alt="DNA Test Kit" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-tech-darker/80 to-transparent"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DNATestKit;
