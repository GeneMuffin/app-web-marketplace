
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface FeatureBoxProps {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  targetId: string;
  colorAccent: string;
  index: number;
}

const FeatureBox: React.FC<FeatureBoxProps> = ({
  title,
  description,
  imageUrl,
  buttonText,
  targetId,
  colorAccent,
  index
}) => {
  const boxRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, []);

  const scrollToSection = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div 
      ref={boxRef}
      className="feature-card opacity-0" 
      style={{ 
        animationDelay: `${index * 200}ms`,
      }}
    >
      <div 
        className="relative h-[450px] w-full overflow-hidden group"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} style={{
          background: `linear-gradient(to bottom, transparent, ${colorAccent})`
        }}></div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-white font-semibold mb-2 text-2xl tracking-wide">
            {title}
          </h3>
          
          <p className="text-white/80 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {description}
          </p>
          
          <Button 
            onClick={scrollToSection}
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 transition-all duration-300 group flex items-center gap-2"
          >
            {buttonText}
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeatureBox;
