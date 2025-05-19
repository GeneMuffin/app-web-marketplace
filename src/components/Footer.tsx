
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { XIcon } from "@/utils/custom-icons";
import CookieSettings from "@/components/CookieSettings";

const Footer = () => {
  const [cookieDialogOpen, setCookieDialogOpen] = useState(false);

  return (
    <footer className="bg-gene-dark text-white pt-16 pb-8 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">GeneMuffin</h3>
            <p className="text-white/80 mb-6">
              Empowering you to own, protect, and profit from your genetic data.
            </p>
            <div className="flex">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full bg-gene-primary/10 hover:bg-gene-primary/20 text-gene-primary"
                onClick={() => window.open("https://x.com/GeneMuffin_", "_blank")}
              >
                <XIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-3">
              <li><a href="#genetic-insights" className="text-white/80 hover:text-gene-primary transition-colors">Genetic Insights</a></li>
              <li><a href="#dna-marketplace" className="text-white/80 hover:text-gene-primary transition-colors">DNA Marketplace</a></li>
              <li><a href="#dna-romance" className="text-white/80 hover:text-gene-primary transition-colors">DNA Romance</a></li>
              <li><a href="#" className="text-white/80 hover:text-gene-primary transition-colors">Genetic Research</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/80 hover:text-gene-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-white/80 hover:text-gene-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-white/80 hover:text-gene-primary transition-colors">Data Security</a></li>
              <li><a href="#" className="text-white/80 hover:text-gene-primary transition-colors">Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-white/60 text-sm">
              &copy; 2025 GeneMuffin.com. All rights reserved.
            </p>
          </div>
          
          <div>
            <Button 
              variant="link" 
              className="text-white/60 text-sm"
              onClick={() => setCookieDialogOpen(true)}
            >
              Cookie Settings
            </Button>
          </div>
        </div>
      </div>

      <CookieSettings 
        isOpen={cookieDialogOpen}
        onOpenChange={setCookieDialogOpen}
      />
    </footer>
  );
};

export default Footer;
