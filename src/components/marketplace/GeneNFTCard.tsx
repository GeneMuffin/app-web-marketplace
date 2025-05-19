
import React, { useState } from 'react';
import { Heart, Clock, ArrowUpRight, Shield, ShoppingCart, Share2, File, Dna } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Card, CardContent } from '@/components/ui/card';

export interface GeneNFTCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  seller: string;
  sellerAvatar: string;
  timeLeft: string;
  category: string;
}

const GeneNFTCard: React.FC<GeneNFTCardProps> = ({
  id,
  title,
  description,
  image,
  price,
  seller,
  sellerAvatar,
  timeLeft,
  category
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { addItem } = useCart();
  const isMobile = useIsMobile();
  
  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: id.toString(),
      name: title,
      price: price,
      quantity: 1,
      image: image,
      currency: 'ETH',
    });
    
    toast.success('Added to cart!', {
      description: `${title} has been added to your cart.`,
    });
  };

  return (
    <>
      <motion.div
        className={cn(
          "tech-card tech-glow",
          isHovered && "shadow-md transform scale-[1.02]"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsDialogOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative overflow-hidden aspect-square">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />
          <div className="absolute top-3 right-3 z-10">
            <button
              onClick={toggleLike}
              className={cn(
                "p-2 rounded-full glass-dark backdrop-blur-sm transition-all",
                isLiked ? "text-gene" : "text-gray-300"
              )}
            >
              <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} />
            </button>
          </div>
          <div className="absolute bottom-3 left-3 z-10">
            <span className="px-2 py-1 text-xs font-medium rounded-full glass-dark backdrop-blur-sm text-gray-200">
              {category}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-tech-darkest/80 to-transparent opacity-0 transition-opacity duration-300"
               style={{ opacity: isHovered ? 0.9 : 0 }}></div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-foreground truncate">{title}</h3>
            <span className="text-gene font-semibold">{price} ETH</span>
          </div>
          
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src={sellerAvatar} alt={seller} className="w-6 h-6 rounded-full" />
              <span className="text-xs text-muted-foreground">{seller}</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="mr-1 h-3.5 w-3.5" />
              <span>{timeLeft}</span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-border/30">
            <Button 
              variant="outline" 
              className="w-full text-white border-border/30 hover:bg-black/80 bg-black cart-btn-hover"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
          </div>
        </div>
      </motion.div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-hidden border-0 bg-tech-darkest p-0 rounded-xl">
          <div className="relative bg-gradient-to-b from-tech-dark to-tech-darkest">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-tech-accent/10 to-transparent opacity-60"></div>
            
            <DialogHeader className="px-6 pt-6 pb-2 relative z-10">
              <DialogTitle className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
                <span className="text-tech-accent">{title}</span>
              </DialogTitle>
              <DialogDescription className="text-muted-foreground flex items-center gap-1">
                <Dna className="h-4 w-4 text-tech-accent" />
                <span>{category} DNA Marketplace</span>
              </DialogDescription>
            </DialogHeader>
            
            <ScrollArea className="h-full max-h-[75vh]">
              <div className="p-6 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="overflow-hidden rounded-xl border border-tech-accent/20 bg-black/30 backdrop-blur-sm shadow-lg shadow-tech-accent/5">
                      <div className="relative aspect-square">
                        <img src={image} alt={title} className="w-full h-full object-cover" />
                        <div className="absolute top-3 right-3">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button 
                                  onClick={toggleLike}
                                  className={cn(
                                    "p-2 rounded-full glass-dark backdrop-blur-sm transition-all",
                                    isLiked ? "text-gene" : "text-gray-300"
                                  )}
                                >
                                  <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent side="bottom">
                                <p>{isLiked ? 'Remove from favorites' : 'Add to favorites'}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <img src={sellerAvatar} alt={seller} className="w-8 h-8 rounded-full border-2 border-tech-accent/30" />
                              <div>
                                <p className="text-xs text-gray-300">Seller</p>
                                <p className="text-sm font-medium text-white">{seller}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button className="p-2 rounded-full glass-dark backdrop-blur-sm text-gray-300 hover:text-white transition-colors">
                                      <Share2 className="h-4 w-4" />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom">
                                    <p>Share this gene data</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Card className="border border-tech-accent/20 bg-tech-dark/50 backdrop-blur-sm">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-sm font-medium text-gray-300">Time Left</h3>
                          <div className="flex items-center text-tech-accent">
                            <Clock className="mr-1 h-4 w-4" />
                            <span className="font-medium">{timeLeft}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium text-gray-300">Category</h3>
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-tech-accent/10 text-tech-accent">
                            {category}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
                    </div>
                    
                    <div className="py-3 border-t border-b border-tech-accent/20">
                      <div className="flex items-end justify-between mb-1">
                        <h3 className="text-lg font-semibold text-white">Price</h3>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-tech-accent">{price}</span>
                          <span className="text-md text-gray-300">ETH</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 mt-4">
                        <Button 
                          className="flex-1 bg-tech-accent hover:bg-tech-accent/90 text-white py-5 rounded-lg font-medium"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(e);
                            setIsDialogOpen(false);
                          }}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="flex-1 py-5 rounded-lg font-medium border-tech-accent/30 text-tech-accent hover:bg-tech-accent/10"
                        >
                          Request Access
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Data Details</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Card className="border border-tech-accent/20 bg-tech-dark/30 backdrop-blur-sm hover:bg-tech-dark/50 transition-colors group">
                          <CardContent className="p-3 flex items-center gap-3">
                            <div className="rounded-full bg-tech-accent/10 p-2 group-hover:bg-tech-accent/20 transition-colors">
                              <File className="h-4 w-4 text-tech-accent" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-200">File Size</h4>
                              <p className="text-xs text-gray-400">256MB Compressed</p>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="border border-tech-accent/20 bg-tech-dark/30 backdrop-blur-sm hover:bg-tech-dark/50 transition-colors group">
                          <CardContent className="p-3 flex items-center gap-3">
                            <div className="rounded-full bg-tech-accent/10 p-2 group-hover:bg-tech-accent/20 transition-colors">
                              <Dna className="h-4 w-4 text-tech-accent" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-200">Gene Markers</h4>
                              <p className="text-xs text-gray-400">1,248 Unique Patterns</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Data Usage Rights</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Shield className="h-4 w-4 text-tech-success mr-2 mt-0.5" />
                          <span className="text-sm text-gray-300">Research access for academic purposes</span>
                        </li>
                        <li className="flex items-start">
                          <Shield className="h-4 w-4 text-tech-success mr-2 mt-0.5" />
                          <span className="text-sm text-gray-300">Personal health insights</span>
                        </li>
                        <li className="flex items-start">
                          <Shield className="h-4 w-4 text-tech-success mr-2 mt-0.5" />
                          <span className="text-sm text-gray-300">De-identified commercial use with permission</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="pt-2 mt-1 border-t border-tech-accent/20">
                      <h3 className="text-sm font-medium text-gray-400 mb-1 mt-2">Blockchain Security</h3>
                      <p className="text-xs text-gray-500">
                        This genetic data is securely stored on the blockchain with end-to-end encryption. 
                        Your access is controlled through smart contracts that ensure data privacy and ownership.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GeneNFTCard;
