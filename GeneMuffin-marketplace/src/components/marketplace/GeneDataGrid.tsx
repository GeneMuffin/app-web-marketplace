
import React, { useEffect, useState } from 'react';
import GeneNFTCard, { GeneNFTCardProps } from './GeneNFTCard';
import { Filter, ArrowUpDown, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';

// Sample data for the NFTs
const mockNFTs: GeneNFTCardProps[] = [
  {
    id: 1,
    title: "Blood Type Genetic Markers",
    description: "Complete genetic sequence for blood type markers including rare variants and hereditary factors.",
    image: "/images/BloodTypeGeneticMarkers.png",
    price: 0.85,
    seller: "GeneResearch",
    sellerAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
    timeLeft: "2d 5h 33m",
    category: "Blood Data"
  },
  {
    id: 2,
    title: "Neural Pathway Mapping",
    description: "Complete genetic data about neural pathway development and brain function correlations.",
    image: "/images/NeuralPathwayMapping.png",
    price: 1.25,
    seller: "BrainScience",
    sellerAvatar: "https://randomuser.me/api/portraits/women/2.jpg",
    timeLeft: "1d 12h 45m",
    category: "DNA Traits"
  },
  {
    id: 3,
    title: "Heart Health Genetic Profile",
    description: "Cardiovascular genetic risk factors and hereditary markers for heart health assessment.",
    image: "/images/HeartHealthGeneticProfile.png",
    price: 0.95,
    seller: "CardioGenomics",
    sellerAvatar: "https://randomuser.me/api/portraits/men/3.jpg",
    timeLeft: "3d 8h 22m",
    category: "Health Risks"
  },
  {
    id: 4,
    title: "Sleep Pattern Genetic Data",
    description: "Comprehensive genetic markers correlated with sleep quality, patterns, and disorders.",
    image: "/images/SleepPatternGeneticData.png",
    price: 0.75,
    seller: "SleepScience",
    sellerAvatar: "https://randomuser.me/api/portraits/women/4.jpg",
    timeLeft: "4d 16h 10m",
    category: "Health Risks"
  },
  {
    id: 5,
    title: "Immune Response Genomics",
    description: "Detailed genetic sequences relating to immune system response and efficiency.",
    image: "/images/ImmuneResponseGenomics.png",
    price: 1.05,
    seller: "ImmunoTech",
    sellerAvatar: "https://randomuser.me/api/portraits/men/5.jpg",
    timeLeft: "1d 20h 15m",
    category: "Blood Data"
  },
  {
    id: 6,
    title: "Cognitive Function Markers",
    description: "Genetic markers associated with cognitive abilities, memory, and mental processing.",
    image: "/images/CognitiveFunctionMarkers.png",
    price: 1.15,
    seller: "CogniGenetics",
    sellerAvatar: "https://randomuser.me/api/portraits/women/6.jpg",
    timeLeft: "2d 14h 5m",
    category: "DNA Traits"
  },
  {
    id: 7,
    title: "Kidney Function Biomarkers",
    description: "Genetic data on kidney function, efficiency, and hereditary kidney disease patterns.",
    image: "/images/KidneyFunctionBiomarkers.png",
    price: 0.90,
    seller: "NephroGen",
    sellerAvatar: "https://randomuser.me/api/portraits/men/7.jpg",
    timeLeft: "5d 6h 55m",
    category: "Kidney Profile"
  },
  {
    id: 8,
    title: "Gut Microbiome Analysis",
    description: "Complete microbiome sequencing data with health correlation markers.",
    image: "/images/GutMicrobiomeAnalysis.png",
    price: 0.80,
    seller: "MicroBiome",
    sellerAvatar: "https://randomuser.me/api/portraits/women/8.jpg",
    timeLeft: "3d 9h 42m",
    category: "Microbiome"
  }
];

interface GeneDataGridProps {
  initialSearchQuery?: string;
}

const GeneDataGrid = ({ initialSearchQuery = '' }: GeneDataGridProps) => {
  const [nfts, setNfts] = useState<GeneNFTCardProps[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2]);
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Initialize search query from props when component mounts
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
      setShowFilters(true); // Show filters when search is active
    }
  }, [initialSearchQuery]);
  
  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setNfts(mockNFTs);
    }, 500);
  }, []);
  
  const filteredNFTs = nfts.filter(nft => {
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!nft.title.toLowerCase().includes(query) && 
          !nft.description.toLowerCase().includes(query) && 
          !nft.category.toLowerCase().includes(query) &&
          !nft.seller.toLowerCase().includes(query)) {
        return false;
      }
    }
    
    // Filter by category
    if (activeCategory !== "all" && nft.category.toLowerCase() !== activeCategory.toLowerCase()) {
      return false;
    }
    
    // Filter by price range
    if (nft.price < priceRange[0] || nft.price > priceRange[1]) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    // Sort by selected option
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "newest":
      default:
        return b.id - a.id;
    }
  });
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const clearSearch = () => {
    setSearchQuery('');
  };
  
  return (
    <div className="space-y-6 grid-bg">
      <div className="scanner-line" />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-foreground">Genetic Data DNA Marketplace</h2>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="black" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px] bg-black text-white border-0">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {searchQuery && (
        <div className="flex items-center justify-between bg-tech-accent/10 p-3 rounded-lg border border-tech-accent/20">
          <p className="text-sm text-foreground">
            Showing results for: <span className="font-medium">{searchQuery}</span>
          </p>
          <Button variant="ghost" size="sm" onClick={clearSearch} className="text-tech-accent hover:text-tech-accent/90 hover:bg-tech-accent/10">
            Clear Search
          </Button>
        </div>
      )}
      
      {/* Filters section */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 tech-card">
              <h3 className="text-sm font-medium text-foreground mb-4">Filter Options</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Search by keyword</label>
                  <Input 
                    placeholder="Search gene data" 
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="bg-tech-dark border-tech-accent/20 focus-visible:ring-tech-accent"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Price range (ETH)</label>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 2]}
                      max={2}
                      step={0.1}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="py-4"
                    />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>{priceRange[0]} ETH</span>
                      <span>{priceRange[1]} ETH</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Availability</label>
                  <Select defaultValue="all">
                    <SelectTrigger className="border-tech-accent/20">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Items</SelectItem>
                      <SelectItem value="buy-now">Buy Now</SelectItem>
                      <SelectItem value="auction">On Auction</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Tabs defaultValue="all" onValueChange={setActiveCategory}>
        <div className="relative w-full overflow-hidden">
          <ScrollArea className="w-full" orientation="horizontal">
            <TabsList className="mb-6 bg-tech-dark/30 p-1 w-max min-w-full flex">
              <TabsTrigger value="all" className="rounded-md text-foreground data-[state=active]:bg-tech-accent data-[state=active]:text-white">All</TabsTrigger>
              <TabsTrigger value="blood data" className="rounded-md text-foreground data-[state=active]:bg-tech-accent data-[state=active]:text-white">Blood Data</TabsTrigger>
              <TabsTrigger value="dna traits" className="rounded-md text-foreground data-[state=active]:bg-tech-accent data-[state=active]:text-white">DNA Traits</TabsTrigger>
              <TabsTrigger value="kidney profile" className="rounded-md text-foreground data-[state=active]:bg-tech-accent data-[state=active]:text-white">Kidney Profile</TabsTrigger>
              <TabsTrigger value="microbiome" className="rounded-md text-foreground data-[state=active]:bg-tech-accent data-[state=active]:text-white">Microbiome</TabsTrigger>
              <TabsTrigger value="health risks" className="rounded-md text-foreground data-[state=active]:bg-tech-accent data-[state=active]:text-white">Health Risks</TabsTrigger>
            </TabsList>
          </ScrollArea>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredNFTs.length > 0 ? (
            <AnimatePresence>
              {filteredNFTs.map((nft) => (
                <GeneNFTCard key={nft.id} {...nft} />
              ))}
            </AnimatePresence>
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-muted-foreground">
              {nfts.length > 0 ? (
                <>
                  <ArrowUpDown className="w-12 h-12 mb-4 text-tech-accent/40" />
                  <h3 className="text-xl font-medium mb-2">No matching items</h3>
                  <p>Try adjusting your filters to find what you're looking for.</p>
                </>
              ) : (
                <div className="flex space-x-4 justify-center">
                  <div className="loading-dot w-3 h-3 rounded-full bg-tech-accent"></div>
                  <div className="loading-dot w-3 h-3 rounded-full bg-tech-accent"></div>
                  <div className="loading-dot w-3 h-3 rounded-full bg-tech-accent"></div>
                </div>
              )}
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default GeneDataGrid;
