
import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureBox from "@/components/FeatureBox";
import ServiceSection from "@/components/ServiceSection";
import Footer from "@/components/Footer";
import { Dna, ShoppingCart, Heart, Calendar, FileText, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <HeroSection />
      
      {/* Features Section */}
      <section id="features" className="relative bg-white py-24 px-6">
        <div 
          className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent"
        ></div>
        
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Your cozy muffin hub for health optimization. An advanced suite of health tests, supplements, 
              family history insights, and expert support to elevate your health from average to exceptional.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureBox 
              title="GENETIC INSIGHTS"
              description="Advanced DNA, microbiome & sports performance at-home testing."
              imageUrl="/images/genetic-insights.png"
              buttonText="EXPLORE"
              targetId="genetic-insights"
              colorAccent="#10B981"
              index={0}
            />
            
            <FeatureBox 
              title="DNA MARKETPLACE"
              description="A marketplace connecting pharma, research institutions, and individuals."
              imageUrl="/images/dna-marketplace.png"
              buttonText="EXPLORE"
              targetId="dna-marketplace"
              colorAccent="#8B5CF6"
              index={1}
            />
            
            <FeatureBox 
              title="DNA ROMANCE"
              description="Uncover your perfect match through your DNA and experience compatibility like never before."
              imageUrl="/images/dna-romance.png"
              buttonText="MEET YOUR MATCH"
              targetId="dna-romance"
              colorAccent="#F59E0B"
              index={2}
            />
          </div>
        </div>
      </section>
      
      {/* Service Sections */}
      <ServiceSection 
        id="genetic-insights"
        title="Advanced Genetic and Microbiome Testing"
        description="Comprehensive DNA, blood, and microbiome analysis from one of our global labs, delivering industry-leading turnaround times and secure results. 200+ biomarkers decoded. 30+ nutrients crafted. Infinite health potential unlocked."
        imageUrl="/images/advanced-genetic.png"
        buttonText="Pre-order Testing Kit"
        buttonUrl="#"
        align="left"
        accentColor="#10B981"
        icon={<Dna size={16} />}
      />
      
      <ServiceSection 
        id="dna-marketplace"
        title="Redefining How Your Genetic Data Works for You"
        description="With advanced testing, expert insights, and secure blockchain integration, we transform your DNA data into actionable wellness solutions and opportunities for monetization, putting you in control of its value. Your data is securely stored on the blockchain, ensuring privacy and tamper-proof protection."
        imageUrl="/images/advanced-testing.png"
        buttonText="Explore Marketplace"
        buttonUrl="https://Marketplace.GeneMuffin.com"
        align="right"
        accentColor="#8B5CF6"
        icon={<ShoppingCart size={16} />}
      />
      
      <ServiceSection 
        id="dna-romance"
        title="DNA Matchmaking for Love and Beyond"
        description="DNA matchmaking uses genetic insights and personality types to identify traits that align with your ideal partner, including health risks, personality, and lifestyle preferences. This science-backed approach offers a deeper, more personalized way to find lasting compatibility and connection."
        imageUrl="/images/app-report-demo-s.png"
        buttonText="Learn More"
        buttonUrl="#"
        align="left"
        accentColor="#F59E0B"
        icon={<Heart size={16} />}
      />
      
      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Transform your health with GeneMuffin</h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed text-balance">
            Customized to your DNA, lifestyle, and goals, our cutting-edge approach elevates 
            your health like never before. GeneMuffin is more than just a health solution; 
            it's the ultimate way to transform your well-being.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gene-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Dna className="text-gene-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Health Programs</h3>
              <p className="text-gray-600">Optimized through DNA testing, providing tailored insights and strategies to enhance your overall wellness.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gene-tech-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="text-gene-tech-purple" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Transparent Blockchain Records</h3>
              <p className="text-gray-600">DNA on the blockchain ensures secure, private, and tamper-proof storage, giving you full control over your data.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gene-web3-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="text-gene-web3-orange" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Subscription Plans</h3>
              <p className="text-gray-600">Monthly or annual subscriptions for personalized health programs, combining testing, expert guidance, and supplements.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Products Section */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Freshly baked to perfectly suit your personalized health needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gene-primary/10 rounded-full flex items-center justify-center mb-6">
                <Dna className="text-gene-primary" size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Diagnostics</h3>
              <p className="text-gray-600 mb-6">Advanced DNA, microbiome, sports performance, and ancestry at-home testing kits with personalized reports.</p>
              <button className="text-gene-primary font-medium hover:underline">Pre-order</button>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gene-web3-orange/10 rounded-full flex items-center justify-center mb-6">
                <Heart className="text-gene-web3-orange" size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Dating App</h3>
              <p className="text-gray-600 mb-6">DNA matchmaking with insights into compatibility, health risks, and future traits for deeper connections.</p>
              <button className="text-gene-web3-orange font-medium hover:underline">Learn More</button>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gene-tech-purple/10 rounded-full flex items-center justify-center mb-6">
                <Users className="text-gene-tech-purple" size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Genetics Data Marketplace</h3>
              <p className="text-gray-600 mb-6">A marketplace connecting pharma companies, research institutions, and individuals.</p>
              <button className="text-gene-tech-purple font-medium hover:underline">Learn More</button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Expert Partners Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Partnering with Experts to Deliver Precision</h2>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed text-balance">
            GeneMuffin's diagnostic tests are developed in our laboratories, as well as collaboration with leading laboratories 
            and researchers. By partnering with world-class facilities, we ensure accurate results, faster processing times, 
            and continuously evolving testing capabilities—all tailored to deliver exceptional value and insights for our users.
          </p>
        </div>
      </section>
      
      {/* Pre-Footer CTA */}
      <section className="relative py-32 overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(96, 165, 250, 0.1))",
            clipPath: "polygon(0 0, 100% 20%, 100% 100%, 0 80%)"
          }}
        ></div>
        
        <div className="container mx-auto relative z-10 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Up your health game</h2>
            <p className="text-xl text-gray-600 mb-8">
              200+ biomarkers decoded. 30+ nutrients crafted. Infinite health potential unlocked.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="glass-button text-lg">Order DNA Kit</button>
              <button className="px-6 py-3 rounded-lg border border-gene-primary text-gene-primary bg-transparent hover:bg-gene-primary/5 transition-colors duration-300 text-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
