
import React from 'react';
import { Shield, Key, Database, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Database className="h-10 w-10 text-gene" />,
    title: 'Decentralized Storage',
    description: 'Gene data is stored across multiple nodes on the blockchain, ensuring redundancy and protection against data loss or tampering.',
  },
  {
    icon: <Shield className="h-10 w-10 text-gene" />,
    title: 'Enhanced Security',
    description: 'Cryptographic protocols secure all data transactions. Each record is linked and secured using cryptography, making unauthorized changes virtually impossible.',
  },
  {
    icon: <Key className="h-10 w-10 text-gene" />,
    title: 'Selective Authorization',
    description: 'Smart contracts enable you to grant specific access rights to your genetic data, allowing you to share only what you want, with whom you want.',
  },
  {
    icon: <Fingerprint className="h-10 w-10 text-gene" />,
    title: 'Ownership Control',
    description: 'You maintain complete ownership of your genetic data. NFT tokens represent your ownership rights that cannot be revoked without your permission.',
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  },
};

const BlockchainExplainer = () => {
  return (
    <section className="py-12 relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gene/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-gene/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="text-center mb-12">
        <motion.h2 
          className="text-3xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Blockchain Technology
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Our platform utilizes advanced blockchain technology to secure your genetic data 
            while giving you complete control.
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-gene/30 to-gene mx-auto mt-8"></div>
        </motion.div>
      </div>
      
      <motion.div 
        className="grid md:grid-cols-2 gap-8"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            variants={item}
            className="glass p-8 rounded-xl border border-white/10 shadow-sm hover:shadow-md transition-all duration-300 group"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="mb-6 bg-gene/10 p-4 rounded-full inline-block group-hover:bg-gene/20 transition-colors duration-300">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
            <p className="text-gray-400 text-lg">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        className="mt-16 glass p-10 rounded-xl border border-gene/20 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-white mb-5">Why use blockchain for gene data?</h3>
        <p className="text-gray-400 mb-6 text-lg">
          Genetic data is uniquely personal and valuable. Traditional data storage methods often leave you with little control
          over how your data is used once shared. With blockchain technology, you remain in control by:
        </p>
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-4">
          <ul className="space-y-3">
            <li className="flex items-center text-gray-400">
              <div className="h-2 w-2 rounded-full bg-gene mr-3"></div>
              <span className="text-lg">Maintaining verifiable proof of ownership</span>
            </li>
            <li className="flex items-center text-gray-400">
              <div className="h-2 w-2 rounded-full bg-gene mr-3"></div>
              <span className="text-lg">Creating an immutable record of all data access</span>
            </li>
          </ul>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-400">
              <div className="h-2 w-2 rounded-full bg-gene mr-3"></div>
              <span className="text-lg">Enabling granular permissions through smart contracts</span>
            </li>
            <li className="flex items-center text-gray-400">
              <div className="h-2 w-2 rounded-full bg-gene mr-3"></div>
              <span className="text-lg">Providing a transparent marketplace for authorized data sharing</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </section>
  );
};

export default BlockchainExplainer;
