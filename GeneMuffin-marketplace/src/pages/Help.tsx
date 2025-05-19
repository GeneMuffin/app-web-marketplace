
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, MessageCircle, Search, HelpCircle, Info, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    { 
      name: "Getting Started",
      icon: <Info className="h-5 w-5 text-primary/80" />
    },
    { 
      name: "Wallet Setup",
      icon: <HelpCircle className="h-5 w-5 text-primary/80" />
    },
    { 
      name: "Buying NFTs",
      icon: <Search className="h-5 w-5 text-primary/80" />
    },
    { 
      name: "Selling Data",
      icon: <ArrowRight className="h-5 w-5 text-primary/80" />
    }
  ];
  
  const faqs = [
    {
      question: "What is a Gene Data DNA Marketplace?",
      answer: "A Gene Data DNA Marketplace is a digital asset that represents ownership of specific genetic data. It uses blockchain technology to ensure that you maintain control over who can access your genetic information and how it can be used."
    },
    {
      question: "How do I connect my wallet?",
      answer: "Click on the 'Connect Wallet' button in the top right corner of the page. You can choose between MetaMask, WalletConnect, or Coinbase Wallet. Follow the prompts from your wallet provider to complete the connection."
    },
    {
      question: "Is my genetic data secure?",
      answer: "Yes. Your genetic data is stored securely using blockchain technology. All data is encrypted, and access is controlled by smart contracts that require your explicit permission. You maintain complete ownership and control over your data at all times."
    },
    {
      question: "How do I purchase a Gene Data DNA Marketplace?",
      answer: "Browse the marketplace to find a Gene Data DNA Marketplace you're interested in. Click on the DNA Marketplace to view details, then click 'Purchase DNA Marketplace' and confirm the transaction in your wallet. Once the transaction is complete, the DNA Marketplace will appear in your collection."
    },
    {
      question: "Can I sell my own genetic data?",
      answer: "Yes. You can tokenize your genetic data as a DNA Marketplace and list it on our marketplace. You'll need to upload your data, set permissions for how it can be used, and determine a price. Our platform handles the smart contract creation and secure storage."
    },
    {
      question: "What can I do with a Gene Data DNA Marketplace I purchase?",
      answer: "When you purchase a Gene Data DNA Marketplace, you're buying access rights to the genetic data as specified by the seller. These rights might include research use, personal health insights, or commercial applications. The specific permissions are encoded in the DNA Marketplace's smart contract."
    },
    {
      question: "How are royalties handled for Gene Data DNA Marketplace?",
      answer: "Creators of Gene Data DNA Marketplace can set royalty percentages that ensure they receive a portion of all future sales. This is automatically handled by the smart contract, ensuring that originators continue to benefit from their data."
    },
  ];

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Help Center</h1>
          <p className="text-gray-400">Find answers to common questions about using the DNA Marketplace by GeneMuffin</p>
        </div>
        
        <Card className="bg-black border border-gray-800 mb-8 overflow-hidden">
          <Tabs defaultValue="faq" className="w-full">
            <TabsList className="w-full border-b border-gray-800 bg-black rounded-none">
              <TabsTrigger value="faq" className="data-[state=active]:bg-transparent data-[state=active]:text-primary">
                <span className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  FAQs
                </span>
              </TabsTrigger>
              <TabsTrigger value="guides" className="data-[state=active]:bg-transparent data-[state=active]:text-primary">
                <span className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  User Guides
                </span>
              </TabsTrigger>
              <TabsTrigger value="contact" className="data-[state=active]:bg-transparent data-[state=active]:text-primary">
                <span className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Contact Support
                </span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="faq" className="space-y-6 p-0 m-0 mt-0">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold mb-2 text-white">How can we help you?</h2>
                  <p className="text-gray-400">Search for answers or browse the categories below</p>
                </div>
                
                <div className="relative mb-8">
                  <Input 
                    placeholder="Search for answers..." 
                    className="bg-gray-900/50 border-gray-800 pl-10 focus-visible:ring-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Button 
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 px-3 py-1 bg-primary/90 hover:bg-primary text-black rounded-md"
                    size="sm"
                  >
                    Search
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {categories.map((category, index) => (
                    <div 
                      key={index}
                      className="p-4 text-center flex flex-col items-center justify-center border border-gray-800 rounded-lg bg-gray-900/20 hover:bg-gray-800/40 hover:border-gray-700 transition-all cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-800/70 flex items-center justify-center mb-3">
                        {category.icon}
                      </div>
                      <p className="font-medium text-gray-300">{category.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            
              <div className="bg-black border-t border-gray-800">
                <div className="p-6 border-b border-gray-800">
                  <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
                </div>
                
                <Accordion type="single" collapsible className="px-6 py-2">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-800 last:border-0">
                      <AccordionTrigger className="hover:bg-gray-900/30 text-gray-200 py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 text-gray-400">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
            
            <TabsContent value="guides" className="space-y-6 p-6 m-0 mt-0">
              <div className="text-center my-16">
                <h3 className="text-xl font-semibold mb-4 text-white">User Guides Coming Soon</h3>
                <p className="text-gray-400 mb-6">
                  We're currently preparing detailed guides to help you navigate the DNA Marketplace.
                </p>
                <Button className="bg-primary hover:bg-primary/90 text-black">
                  Check FAQs Instead
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="contact" className="p-6 m-0 mt-0">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2 text-white">Contact Our Support Team</h3>
                <p className="text-gray-400">
                  Our support agents are available 24/7 to help you with any questions
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 border border-gray-800 rounded-lg bg-gray-900/20 text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-medium mb-2 text-white">Chat Support</h4>
                  <p className="text-gray-400 mb-4">Get help from our support agents via live chat</p>
                  <Button className="bg-primary hover:bg-primary/90 text-black w-full">
                    Start Chat
                  </Button>
                </div>
                
                <div className="p-5 border border-gray-800 rounded-lg bg-gray-900/20 text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Info className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-medium mb-2 text-white">Email Support</h4>
                  <p className="text-gray-400 mb-4">Send us an email and we'll respond within 24h</p>
                  <Button className="bg-primary hover:bg-primary/90 text-black w-full">
                    Send Email
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
        
        <div className="bg-gradient-to-r from-gene to-gene/80 rounded-2xl p-8 flex flex-col sm:flex-row justify-between items-center gap-6 mb-10">
          <div>
            <h2 className="text-xl font-bold mb-2 text-white">Still have questions?</h2>
            <p className="text-white/90 mb-0">
              Our support team is ready to help you with any questions you may have.
            </p>
          </div>
          <Button className="bg-white text-gene hover:bg-gray-100 rounded-lg">
            <MessageCircle className="mr-2 h-4 w-4" />
            Contact Support
          </Button>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Help;
