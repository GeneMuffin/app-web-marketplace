
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import GeneNFTCard from '@/components/marketplace/GeneNFTCard';
import ConnectWalletButton from '@/components/wallet/ConnectWalletButton';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DNATestKit from '@/components/marketplace/DNATestKit';
import CartButton from '@/components/cart/CartButton';
import { 
  GlowingStarsBackgroundCard, 
  GlowingStarsTitle, 
  GlowingStarsDescription 
} from '@/components/ui/glowing-background-stars-card';
import { useIsMobile } from '@/hooks/use-mobile';

const featuredNFTs = [
  {
    id: 1,
    title: "Premium Blood Type Markers",
    description: "Comprehensive genetic markers for blood type and related factor analysis, including rare variants.",
    image: "/images/PremiumBloodTypeMarkers.png",
    price: 1.45,
    seller: "GeneElite",
    sellerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    timeLeft: "1d 8h 15m",
    category: "Blood"
  },
  {
    id: 2,
    title: "Advanced Neural Mapping",
    description: "Complete neural pathway genetic data with cognitive function correlation markers.",
    image: "/images/AdvancedNeuralMapping.png",
    price: 2.15,
    seller: "NeuroBio",
    sellerAvatar: "https://randomuser.me/api/portraits/women/45.jpg",
    timeLeft: "2d 10h 30m",
    category: "Brain"
  },
  {
    id: 3,
    title: "Cardiac Performance Genome",
    description: "Detailed cardiovascular genetic markers with athletic performance and health indicators.",
    image: "/images/CardiacPerformanceGenome.png",
    price: 1.85,
    seller: "HeartGenetics",
    sellerAvatar: "https://randomuser.me/api/portraits/men/68.jpg",
    timeLeft: "3d 5h 40m",
    category: "Heart"
  },
];

const Index = () => {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) return null;

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <HeroSection />
        
        <FeaturedCategories />
        
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
            <h2 className="text-2xl font-bold text-gene" data-component-name="h2">Featured Gene Data</h2>
            <Link to="/marketplace" className="flex-1 sm:flex-none">
              <Button variant="ghost" className="text-gene hover:text-gene/90 hover:bg-gene/10 w-full sm:w-auto justify-between sm:justify-start">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {isMobile ? 
              featuredNFTs.slice(0, 1).map((nft) => (
                <GeneNFTCard key={nft.id} {...nft} />
              ))
              :
              featuredNFTs.map((nft) => (
                <GeneNFTCard key={nft.id} {...nft} />
              ))
            }
            
            {isMobile && (
              <div className="flex justify-center w-full mt-4">
                <Link to="/marketplace" className="w-full">
                  <Button variant="outline" className="w-full border-gene text-gene hover:bg-gene/10">
                    See More Gene Data
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <DNATestKit className="mb-16" />
        
        <div className="gene-gradient rounded-2xl p-8 md:p-12 text-white mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to explore the future of genetic data ownership?</h2>
              <p className="text-white/90 mb-6">
                Connect your wallet now and start discovering valuable genetic data or publish your own data securely.
              </p>
              <div className="flex items-center gap-3">
                <ConnectWalletButton />
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="/images/genetic-data-ownership.png" 
                alt="DNA Visualization" 
                className="rounded-xl w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
        
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gene" data-component-name="h2">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <GlowingStarsBackgroundCard className="h-auto max-h-none border-0">
              <GlowingStarsTitle>Connect Your Wallet</GlowingStarsTitle>
              <div className="flex justify-between items-end mt-2">
                <GlowingStarsDescription>
                  Link your cryptocurrency wallet to securely access and manage genetic data.
                </GlowingStarsDescription>
                <div className="h-8 w-8 rounded-full bg-[hsla(0,0%,100%,.1)] flex items-center justify-center">
                  <span className="font-bold text-white">1</span>
                </div>
              </div>
            </GlowingStarsBackgroundCard>
            
            <GlowingStarsBackgroundCard className="h-auto max-h-none border-0">
              <GlowingStarsTitle>Browse Gene Data</GlowingStarsTitle>
              <div className="flex justify-between items-end mt-2">
                <GlowingStarsDescription>
                  Explore various categories of genetic data with detailed information about each dataset.
                </GlowingStarsDescription>
                <div className="h-8 w-8 rounded-full bg-[hsla(0,0%,100%,.1)] flex items-center justify-center">
                  <span className="font-bold text-white">2</span>
                </div>
              </div>
            </GlowingStarsBackgroundCard>
            
            <GlowingStarsBackgroundCard className="h-auto max-h-none border-0">
              <GlowingStarsTitle>Purchase or Subscribe</GlowingStarsTitle>
              <div className="flex justify-between items-end mt-2">
                <GlowingStarsDescription>
                  Either buy the data for full ownership or subscribe for limited access to the genetic data.
                </GlowingStarsDescription>
                <div className="h-8 w-8 rounded-full bg-[hsla(0,0%,100%,.1)] flex items-center justify-center">
                  <span className="font-bold text-white">3</span>
                </div>
              </div>
            </GlowingStarsBackgroundCard>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Index;
