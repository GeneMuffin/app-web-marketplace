
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download, ExternalLink } from "lucide-react";
import { useIntersectionObserver } from "@/lib/animations";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (sectionRef.current) {
        // Parallax effect
        sectionRef.current.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Only update mouse position for subtle light effect
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-cover bg-center overflow-hidden text-gene-dark"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.4)), url('/images/background.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10"></div>
      
      <div className="container mx-auto px-6 py-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="flex">
              <div 
                ref={ref as React.RefObject<HTMLDivElement>}
                className={`glass-card relative inline-flex px-4 py-2 mb-4 opacity-90 bg-white/60 border border-gene-primary/20 overflow-hidden transition-all duration-1000 ${
                  hasIntersected ? "animate-fade-in" : "opacity-0"
                }`}
              >
                {/* Silver light animation effect */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(200, 200, 210, 0.8) 0%, rgba(200, 200, 210, 0) 50%)`,
                    opacity: 0.6,
                    mixBlendMode: "overlay",
                    transform: "translateZ(0)",
                    transition: "opacity 0.8s ease",
                  }}
                />
                
                {/* Additional shimmer effect */}
                <div 
                  className="absolute inset-0 pointer-events-none overflow-hidden"
                  style={{
                    backgroundImage: "linear-gradient(90deg, transparent, rgba(220, 220, 230, 0.4), transparent)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 3s infinite",
                  }}
                />
                
                <span className="text-gene-primary font-medium relative z-10">Your Recipe for Health, Onchain</span>
              </div>
            </div>
            
            <h1 className="text-gene-dark font-bold mb-4 text-5xl md:text-6xl lg:text-7xl leading-tight">
              Uncover your <span className="text-gene-primary">DNA</span> <br />
              <span className="text-gene-dark/80">like never before.</span>
            </h1>
            
            <p className="text-gene-dark/80 text-lg md:text-xl max-w-xl mb-8 text-balance">
              DNA matchmaking uses genetic insights and personality types to identify traits that align with your ideal partner, including health risks, personality, and lifestyle preferences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="rounded-full bg-gene-primary hover:bg-gene-primary/90 text-white px-8 py-6 h-auto text-lg flex items-center gap-2"
              >
                <Download size={20} />
                Download App
              </Button>
              
              <Button 
                variant="outline" 
                className="rounded-full bg-transparent border-gene-dark/20 text-gene-dark hover:bg-gene-dark/5 px-8 py-6 h-auto text-lg flex items-center gap-2"
                onClick={scrollToFeatures}
              >
                View Services
                <ExternalLink size={18} />
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <img 
              src="/images/dna-test.png" 
              alt="DNA Test Kit" 
              className="object-contain max-w-full rounded-2xl mix-blend-multiply"
            />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce z-20">
        <ArrowDown className="text-gene-dark/70 h-6 w-6" />
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
