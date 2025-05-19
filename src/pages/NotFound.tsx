
import React from "react";
import { Button } from "@/components/ui/button";
import { Home, CircleSlash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-6 relative"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.7)), url('/images/background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Logo */}
      <div className="absolute top-8 left-8">
        <img 
          src="/images/Genemuffin-Logo-s.png" 
          alt="GeneMuffin Logo" 
          className="h-10 md:h-12"
        />
      </div>
      
      <div className="text-center max-w-lg relative z-10">
        <div className="mb-10 relative">
          {/* Icon and 404 display */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <CircleSlash 
                size={120} 
                className="text-gene-primary" 
                strokeWidth={1.5}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/80 h-1/2 w-1/2 rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Error text */}
          <h1 className="text-5xl md:text-6xl font-bold text-gene-dark mb-6">
            404 page not found.
          </h1>
        </div>
        
        <p className="text-lg text-gene-dark/80 mb-10 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back to a safe place.
        </p>
        
        <Button 
          className="glass-button px-8 py-6 h-auto text-base"
          onClick={() => navigate("/")}
        >
          <Home size={18} className="mr-2" />
          Go back home
        </Button>
      </div>
      
      {/* Background grid pattern overlay */}
      <div className="absolute inset-0 -z-0 bg-[linear-gradient(to_right,#f1f1f1_1px,transparent_1px),linear-gradient(to_bottom,#f1f1f1_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
    </div>
  );
};

export default NotFound;
