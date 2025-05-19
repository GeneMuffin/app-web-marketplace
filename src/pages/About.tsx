
import React from 'react';
import Layout from '@/components/layout/Layout';
import BlockchainExplainer from '@/components/about/BlockchainExplainer';
import { ShieldCheck, FileText, Hand, Zap, ArrowRight, Lock, Database, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const About = () => {
  const benefits = [
    {
      icon: <ShieldCheck className="h-8 w-8 text-gene" />,
      title: 'Privacy Protection',
      description: 'Your genetic data remains private with access controlled entirely by you.',
    },
    {
      icon: <FileText className="h-8 w-8 text-gene" />,
      title: 'Transparent Records',
      description: 'All data transactions are recorded on the blockchain for complete transparency.',
    },
    {
      icon: <Hand className="h-8 w-8 text-gene" />,
      title: 'Full Control',
      description: 'You decide who can access your genetic data and for what purposes.',
    },
    {
      icon: <Zap className="h-8 w-8 text-gene" />,
      title: 'Real Value',
      description: 'Monetize your genetic data through secure, authorized access.',
    },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <Layout>
      <div className="relative pt-10 pb-24">
        {/* Background Effects */}
        <div className="absolute top-0 left-[10%] w-64 h-64 bg-gene/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-tech-accent/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gene/10 flex items-center justify-center">
                <Lock className="h-8 w-8 text-gene" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Revolutionizing Genetic Data <span className="text-gene">Ownership</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Learn how blockchain technology transforms genetic data ownership, privacy, and sharing
            </p>
            
            <div className="flex justify-center mt-10">
              <div className="w-20 h-1 bg-gradient-to-r from-gene/30 to-gene"></div>
            </div>
          </motion.div>
          
          {/* Future of Genetic Data Section */}
          <motion.div 
            className="glass rounded-2xl border border-white/10 shadow-xl mb-16 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid md:grid-cols-2 gap-10 p-8 md:p-10">
              <div className="prose max-w-none text-white">
                <h2 className="text-3xl font-bold mb-6 text-gene">The Future of Genetic Data Ownership</h2>
                <p className="text-gray-300 mb-6 text-lg">
                  Genetic data is one of the most personal assets you possess. It contains information about your health predispositions, 
                  ancestry, and biological uniqueness. Traditional systems of data management have often left individuals with little control 
                  over how their genetic information is used once shared.
                </p>
                <p className="text-gray-300 mb-6 text-lg">
                  Our platform changes this paradigm by using blockchain technology to put you in complete control of your genetic data. 
                  Through the use of NFTs (Non-Fungible Tokens), your genetic information is tokenized, allowing you to maintain ownership 
                  while selectively granting access to researchers, healthcare providers, or other entities.
                </p>
                
                <h3 className="text-2xl font-bold mt-10 mb-6 text-white">Why NFTs for Genetic Data?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-gene/20 flex items-center justify-center mt-1 mr-3">
                      <span className="text-gene font-semibold">1</span>
                    </div>
                    <span className="text-gray-300 text-lg">Unique and cannot be replicated</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-gene/20 flex items-center justify-center mt-1 mr-3">
                      <span className="text-gene font-semibold">2</span>
                    </div>
                    <span className="text-gray-300 text-lg">Verifiably owned by a specific individual</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-gene/20 flex items-center justify-center mt-1 mr-3">
                      <span className="text-gene font-semibold">3</span>
                    </div>
                    <span className="text-gray-300 text-lg">Programmable with smart contracts to control access rights</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-gene/20 flex items-center justify-center mt-1 mr-3">
                      <span className="text-gene font-semibold">4</span>
                    </div>
                    <span className="text-gray-300 text-lg">Traceable, so you always know who has accessed your data</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-gene/30 to-tech-accent/30 rounded-xl blur-lg transform scale-105 opacity-70 group-hover:opacity-100 transition-all duration-500"></div>
                  <img 
                    src="/images/dna.jpg" 
                    alt="DNA structure" 
                    className="relative z-10 rounded-xl shadow-lg max-h-96 object-cover border border-white/10 transform group-hover:scale-[1.02] transition-all duration-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-4 bg-gradient-to-r from-gene/10 to-tech-accent/10 p-8 rounded-br-xl rounded-bl-xl border-t border-white/5">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button 
                  className="bg-gene hover:bg-gene/90 text-white px-8 py-6 text-lg rounded-xl shadow-md shadow-gene/20 w-full sm:w-auto"
                  onClick={() => window.location.href = '/marketplace'}
                >
                  Explore Our Marketplace
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Core Blockchain Features */}
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Core Blockchain Features</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                How our blockchain technology protects and empowers your genetic data
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                className="glass rounded-xl p-6 border border-white/10 hover:border-gene/30 transition-all duration-300 group"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="bg-gradient-to-br from-gene/10 to-gene/20 p-4 rounded-full inline-block mb-6 group-hover:bg-gene/30 transition-colors duration-300">
                  <Database className="h-8 w-8 text-gene" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Decentralized Storage</h3>
                <p className="text-gray-400">Data distributed across multiple nodes on the blockchain for redundancy and protection.</p>
              </motion.div>
              
              <motion.div 
                className="glass rounded-xl p-6 border border-white/10 hover:border-gene/30 transition-all duration-300 group"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="bg-gradient-to-br from-gene/10 to-gene/20 p-4 rounded-full inline-block mb-6 group-hover:bg-gene/30 transition-colors duration-300">
                  <ShieldCheck className="h-8 w-8 text-gene" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Enhanced Security</h3>
                <p className="text-gray-400">Cryptographic protocols secure all transactions, making unauthorized changes virtually impossible.</p>
              </motion.div>
              
              <motion.div 
                className="glass rounded-xl p-6 border border-white/10 hover:border-gene/30 transition-all duration-300 group"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className="bg-gradient-to-br from-gene/10 to-gene/20 p-4 rounded-full inline-block mb-6 group-hover:bg-gene/30 transition-colors duration-300">
                  <Fingerprint className="h-8 w-8 text-gene" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Ownership Control</h3>
                <p className="text-gray-400">NFT tokens represent your ownership rights that cannot be revoked without your permission.</p>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Benefits Section */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Benefits of Our Approach</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  className="glass border border-white/10 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-gene/30"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                >
                  <div className="bg-gene/10 p-4 rounded-full inline-block mb-6">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-gray-400 text-lg">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Call to Action Section */}
          <motion.div 
            className="glass border border-white/10 p-10 rounded-2xl mb-12 bg-gradient-to-br from-gene/10 to-transparent"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 1.2 }}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Take Control of Your Genetic Data?</h3>
              <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                Join our platform today and experience a revolutionary approach to genetic data ownership, privacy, and monetization.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  className="bg-gene hover:bg-gene/90 text-white px-8 py-6 text-lg rounded-xl shadow-md"
                  onClick={() => window.location.href = '/marketplace'}
                >
                  Explore Marketplace
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gene text-gene hover:bg-gene/10 px-8 py-6 text-lg rounded-xl"
                  onClick={() => window.location.href = '/help'}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
