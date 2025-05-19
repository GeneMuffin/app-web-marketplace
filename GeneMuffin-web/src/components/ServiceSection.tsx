
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface ServiceSectionProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonUrl: string;
  align?: "left" | "right";
  accentColor: string;
  icon?: React.ReactNode;
}

const ServiceSection: React.FC<ServiceSectionProps> = ({
  id,
  title,
  description,
  imageUrl,
  buttonText,
  buttonUrl,
  align = "left",
  accentColor,
  icon
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id={id}
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 opacity-0"
    >
      <div className="container mx-auto">
        <div className={`flex flex-col ${align === "right" ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12`}>
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div 
                className="absolute -inset-4 rounded-2xl opacity-30"
                style={{ background: `radial-gradient(circle at center, ${accentColor}, transparent 70%)` }}
              ></div>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src={imageUrl} 
                  alt={title}
                  className="w-full object-cover transition-transform duration-700 hover:scale-105"
                  style={{ height: "400px" }}
                />
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 space-y-6">
            <div 
              className="inline-flex items-center px-4 py-2 rounded-full text-sm"
              style={{ background: `${accentColor}20`, color: accentColor }}
            >
              {icon && <span className="mr-2">{icon}</span>}
              <span>{id.split('-').join(' ').toUpperCase()}</span>
            </div>
            
            <h2 className="text-4xl font-bold text-gene-dark tracking-tight">
              {title}
            </h2>
            
            <p className="text-lg text-gene-dark/80 leading-relaxed text-balance">
              {description}
            </p>
            
            <Button 
              className="group flex items-center gap-2 mt-4 transition-all duration-300"
              style={{ 
                background: accentColor, 
                color: "white",
                boxShadow: `0 4px 14px ${accentColor}50` 
              }}
              onClick={() => window.open(buttonUrl, "_blank")}
            >
              {buttonText}
              <ChevronRight className="group-hover:translate-x-1 transition-transform duration-300" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
