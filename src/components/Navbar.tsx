
import React, { useState, useEffect } from "react";
import { ConnectWallet } from "./ConnectWallet";
import { Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 md:px-12 ${
        isScrolled
          ? "py-3 bg-white/95 backdrop-blur-md shadow-md"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img 
              src="/images/Genemuffin-Logo-s.png" 
              alt="GeneMuffin Logo" 
              className={`h-8 md:h-10 transition-all duration-300 ${
                isScrolled ? "filter brightness-90" : "drop-shadow-md"
              }`}
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('genetic-insights')}
            className="text-foreground hover:text-gene-primary transition-colors font-medium"
          >
            Genetic Insights
          </button>
          <button 
            onClick={() => window.open("https://marketplace.genemuffin.com", "_blank")}
            className="text-foreground hover:text-gene-primary transition-colors font-medium"
          >
            DNA Marketplace
          </button>
          <button 
            onClick={() => scrollToSection('dna-romance')}
            className="text-foreground hover:text-gene-primary transition-colors font-medium"
          >
            DNA Romance
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="text-foreground hover:text-gene-primary transition-colors font-medium"
          >
            About
          </button>
          <ConnectWallet />
          
          <Button 
            className="bg-gene-primary hover:bg-gene-primary/90 text-white rounded-full flex items-center gap-2"
            onClick={() => window.open("#", "_blank")}
          >
            <Download size={16} />
            Download App
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-md py-4 px-6 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <button 
              onClick={() => scrollToSection('genetic-insights')}
              className="text-foreground hover:text-gene-primary transition-colors py-2 text-center"
            >
              Genetic Insights
            </button>
            <button 
              onClick={() => window.open("https://marketplace.genemuffin.com", "_blank")}
              className="text-foreground hover:text-gene-primary transition-colors py-2 text-center"
            >
              DNA Marketplace
            </button>
            <button 
              onClick={() => scrollToSection('dna-romance')}
              className="text-foreground hover:text-gene-primary transition-colors py-2 text-center"
            >
              DNA Romance
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-gene-primary transition-colors py-2 text-center"
            >
              About
            </button>
            <div className="py-2 flex justify-center">
              <ConnectWallet />
            </div>
            <div className="py-2 flex justify-center">
              <Button 
                className="bg-gene-primary hover:bg-gene-primary/90 text-white rounded-full w-full flex items-center justify-center gap-2"
                onClick={() => window.open("#", "_blank")}
              >
                <Download size={16} />
                Download App
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
