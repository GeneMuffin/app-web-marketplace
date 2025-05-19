
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) return null;
  
  return (
    <div 
      className="relative overflow-hidden rounded-2xl mb-8 bg-cover bg-center"
      style={{ 
        backgroundImage: 'url(/images/marketplace-background.jpg)',
        backgroundPosition: isMobile ? 'center' : 'center',
      }}
    >
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}></div>
      
      <div className="relative z-10 px-4 py-10 md:py-20 md:px-12 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-2 md:mb-4"
        >
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Discover and Trade <span className="text-[#ff8377] block md:inline">Gene Data</span>
          </h1>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 md:mb-8"
        >
          <p className="text-sm md:text-lg text-gray-100 max-w-3xl">
            The GeneMuffin Marketplace is a secure, blockchain-enabled platform where individuals can share, license, or sell their genetic and microbiome data.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6 md:mt-8">
            <div className="flex flex-col items-center w-1/4 md:w-auto">
              <div className="rounded-full bg-blue-400/20 p-2 md:p-3 mb-2">
                <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-medium text-white text-xs md:text-base">Privacy & Control</h3>
            </div>
            
            <div className="flex flex-col items-center w-1/4 md:w-auto">
              <div className="rounded-full bg-green-400/20 p-2 md:p-3 mb-2">
                <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-medium text-white text-xs md:text-base">Monetization of Data</h3>
            </div>
            
            <div className="flex flex-col items-center w-1/4 md:w-auto">
              <div className="rounded-full bg-purple-400/20 p-2 md:p-3 mb-2">
                <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="font-medium text-white text-xs md:text-base">Trusted Research</h3>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full flex flex-col md:flex-row gap-3 md:gap-4 px-4 md:px-0"
        >
          <Link to="/marketplace" className="w-full md:w-auto">
            <Button className="w-full md:w-auto bg-[#ff8377] hover:bg-[#e07065] text-white px-4 md:px-8 py-4 md:py-6 rounded-xl text-base md:text-lg font-medium transition-all">
              Browse Marketplace
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </Link>
          <Link to="/about" className="w-full md:w-auto">
            <Button variant="outline" className="w-full md:w-auto px-4 md:px-8 py-4 md:py-6 rounded-xl text-base md:text-lg font-medium border-2 hover:bg-gray-50 transition-all text-white bg-transparent hover:bg-white/10 border-white">
              Learn More
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
