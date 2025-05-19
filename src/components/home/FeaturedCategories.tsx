
import React from 'react';
import { Droplets, Dna, Activity, FlaskConical, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const categories = [
  {
    id: 1,
    name: "Blood Data",
    description: "Basic blood parameters and immune indicators",
    icon: <Droplets className="h-4 w-4 text-red-500" />,
    color: "text-red-500",
    image: "/images/BloodData.png",
  },
  {
    id: 2,
    name: "DNA Traits",
    description: "Specific gene sequences and disease risk predictions",
    icon: <Dna className="h-4 w-4 text-violet-500" />,
    color: "text-violet-500",
    image: "/images/DNATraits.png",
  },
  {
    id: 3,
    name: "Kidney Profile",
    description: "Chronic disease-related kidney physiological values",
    icon: <Activity className="h-4 w-4 text-green-500" />,
    color: "text-green-500",
    image: "/images/KidneyProfile.png",
  },
  {
    id: 4,
    name: "Microbiome",
    description: "Gut microbiota analysis and health correlations",
    icon: <FlaskConical className="h-4 w-4 text-blue-500" />,
    color: "text-blue-500",
    image: "/images/Microbiome.png",
  },
  {
    id: 5,
    name: "Health Risks",
    description: "Predictive model summaries and individual risk values",
    icon: <Heart className="h-4 w-4 text-pink-500" />,
    color: "text-pink-500",
    image: "/images/HealthRisks.png",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const GridItem = ({ icon, name, description, color, image }: { 
  icon: React.ReactNode;
  name: string;
  description: string;
  color: string;
  image: string;
}) => {
  return (
    <motion.div 
      variants={item}
      className="min-h-[10rem] md:min-h-[12rem] list-none"
    >
      <div className="relative h-full rounded-[1.25rem] p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div 
          className="relative flex h-full flex-col justify-between gap-4 md:gap-6 overflow-hidden rounded-xl bg-black p-4 md:p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="relative flex flex-1 flex-col justify-between gap-2 md:gap-3">
            <div className={cn("w-fit rounded-lg bg-black/70 p-2", color)}>
              {icon}
            </div>
            <div className="space-y-2 md:space-y-3">
              <h3 className="pt-0.5 text-lg md:text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:leading-[1.875rem] text-balance text-white">
                {name}
              </h3>
              <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-xs md:text-sm leading-[1.125rem] md:leading-[1.375rem] text-gray-300">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedCategories = () => {
  const isMobile = useIsMobile();
  
  // Show only first 3 categories on mobile
  const displayCategories = isMobile ? categories.slice(0, 3) : categories;
  
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-gene" data-component-name="h2">Data Categories</h2>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4" 
        variants={container}
        initial="hidden"
        animate="show"
      >
        {displayCategories.map((category) => (
          <GridItem
            key={category.id}
            icon={category.icon}
            name={category.name}
            description={category.description}
            color={category.color}
            image={category.image}
          />
        ))}
      </motion.div>
      
      {isMobile && (
        <div className="mt-4 text-center">
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gene hover:text-gene/80 font-medium"
          >
            See All Categories
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default FeaturedCategories;
