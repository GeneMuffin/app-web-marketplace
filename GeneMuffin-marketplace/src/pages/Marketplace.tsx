
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import GeneDataGrid from '@/components/marketplace/GeneDataGrid';
import DNATestKit from '@/components/marketplace/DNATestKit';
import { Dna, Shield, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const Marketplace = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  return (
    <Layout>
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden rounded-xl mb-8">
        <div className="absolute inset-0 bg-tech-grid opacity-20"></div>
        <div className="scanner-line"></div>
        
        <div className="relative px-6 py-10 md:py-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 text-center md:text-left">
              DNA Marketplace by <span className="text-tech-accent">GeneMuffin</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 text-center md:text-left">
              Explore, purchase, and manage genetic data securely on the blockchain
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col items-center md:items-start"
              >
                <div className="rounded-full bg-tech-accent/10 p-3 mb-2">
                  <Dna className="w-6 h-6 text-tech-accent" />
                </div>
                <h3 className="font-medium text-foreground">Premium Genetic Data</h3>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col items-center md:items-start"
              >
                <div className="rounded-full bg-tech-accent/10 p-3 mb-2">
                  <Shield className="w-6 h-6 text-tech-accent" />
                </div>
                <h3 className="font-medium text-foreground">Blockchain Security</h3>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col items-center md:items-start"
              >
                <div className="rounded-full bg-tech-accent/10 p-3 mb-2">
                  <Database className="w-6 h-6 text-tech-accent" />
                </div>
                <h3 className="font-medium text-foreground">Decentralized Storage</h3>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* DNA Test Collection Kit Section */}
      <DNATestKit className="mb-10" />
      
      <GeneDataGrid initialSearchQuery={searchQuery} />
    </Layout>
  );
};

export default Marketplace;
