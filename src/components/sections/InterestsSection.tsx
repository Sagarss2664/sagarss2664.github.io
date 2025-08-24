
import React from "react";
import SectionHeading from "@/components/SectionHeading";
import { motion } from "framer-motion";
import { 
  Code2, 
  Monitor, 
  BarChart, 
  Brain, 
  Infinity, 
  Package, 
  TestTube,
  Gamepad,
  Database,
  Key,
  LucideIcon 
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface Interest {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
}

const InterestsSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // First row of interests
  const interestsRow1: Interest[] = [
    { id: "web-dev", name: "Web Development", icon: Code2, color: "#9b87f5" },
    { id: "software-dev", name: "Software Development", icon: Monitor, color: "#7E69AB" },
    { id: "data-viz", name: "Data Visualization", icon: BarChart, color: "#6E59A5" },
    { id: "game-dev", name: "Game Development", icon: Gamepad, color: "#9b87f5" },
    { id: "ai", name: "Artificial Intelligence", icon: Brain, color: "#7E69AB" },
    { id: "ml", name: "Machine Learning", icon: Infinity, color: "#6E59A5" },
    { id: "fullstack", name: "Full Stack", icon: Package, color: "#9b87f5" },
    { id: "beta-testing", name: "Beta Testing", icon: TestTube, color: "#7E69AB" },
    // Duplicate interests for seamless scrolling
    { id: "web-dev-2", name: "Web Development", icon: Code2, color: "#9b87f5" },
    { id: "software-dev-2", name: "Software Development", icon: Monitor, color: "#7E69AB" },
    { id: "data-viz-2", name: "Data Visualization", icon: BarChart, color: "#6E59A5" },
    { id: "game-dev-2", name: "Game Development", icon: Gamepad, color: "#9b87f5" },
    { id: "ai-2", name: "Artificial Intelligence", icon: Brain, color: "#7E69AB" },
    { id: "ml-2", name: "Machine Learning", icon: Infinity, color: "#6E59A5" },
    { id: "fullstack-2", name: "Full Stack", icon: Package, color: "#9b87f5" },
    { id: "beta-testing-2", name: "Beta Testing", icon: TestTube, color: "#7E69AB" },
  ];

  // Second row of interests
  const interestsRow2: Interest[] = [
    { id: "databases", name: "Databases", icon: Database, color: "#9b87f5" },
    { id: "cybersecurity", name: "Cybersecurity", icon: Key, color: "#7E69AB" },
    { id: "cloud-computing", name: "Cloud Computing", icon: Package, color: "#6E59A5" },
    { id: "mobile-dev", name: "Mobile Development", icon: Monitor, color: "#9b87f5" },
    { id: "devops", name: "DevOps", icon: TestTube, color: "#7E69AB" },
    { id: "ui-design", name: "UI/UX Design", icon: Code2, color: "#6E59A5" },
    { id: "blockchain", name: "Blockchain", icon: Brain, color: "#9b87f5" },
    { id: "api-dev", name: "API Development", icon: Package, color: "#7E69AB" },
    // Duplicate interests for seamless scrolling
    { id: "databases-2", name: "Databases", icon: Database, color: "#9b87f5" },
    { id: "cybersecurity-2", name: "Cybersecurity", icon: Key, color: "#7E69AB" },
    { id: "cloud-computing-2", name: "Cloud Computing", icon: Package, color: "#6E59A5" },
    { id: "mobile-dev-2", name: "Mobile Development", icon: Monitor, color: "#9b87f5" },
    { id: "devops-2", name: "DevOps", icon: TestTube, color: "#7E69AB" },
    { id: "ui-design-2", name: "UI/UX Design", icon: Code2, color: "#6E59A5" },
    { id: "blockchain-2", name: "Blockchain", icon: Brain, color: "#9b87f5" },
    { id: "api-dev-2", name: "API Development", icon: Package, color: "#7E69AB" },
  ];

  return (
    <section id="interests" className="py-16">
      <div className="container mx-auto">
        <SectionHeading title="Interests" subtitle="What I'm passionate about" />
        
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          {/* First row - scrolling left */}
          <div className="relative overflow-hidden">
            {/* Blur/fade effect at the edges */}
            <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-background to-transparent z-10"></div>
            <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-background to-transparent z-10"></div>
            
            <div className="infinite-scroll-left py-2">
              <div className="flex gap-1 md:gap-4">
                {interestsRow1.map((interest) => (
                  <motion.div
                    key={interest.id}
                    className="flex-shrink-0 rounded-[1.2rem] border backdrop-blur-md p-2 md:p-3 flex items-center gap-1 md:gap-3 min-w-[90px] md:min-w-[180px] h-[40px] md:h-[60px]"
                    whileHover={{ 
                      scale: 1.05, 
                      transition: { 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 10 
                      } 
                    }}
                    style={{
                      backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(26,31,44,0.9)', // Dark Purple
                      borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(126,105,171,0.3)' // Secondary Purple
                    }}
                  >
                    <motion.div 
                      className="flex items-center justify-center w-6 h-6 md:w-10 md:h-10 rounded-full" 
                      style={{ backgroundColor: `${interest.color}30` }}
                    >
                      <span style={{ color: isDark ? interest.color : '#fff' }}>
                        <interest.icon size={16} />
                      </span>
                    </motion.div>
                    <span className="text-[0.7rem] md:text-sm font-medium whitespace-nowrap truncate text-white">
                      {interest.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Second row - scrolling right */}
          <div className="relative overflow-hidden">
            {/* Blur/fade effect at the edges */}
            <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-background to-transparent z-10"></div>
            <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-background to-transparent z-10"></div>
            
            <div className="infinite-scroll-right py-2">
              <div className="flex gap-1 md:gap-4">
                {interestsRow2.map((interest) => (
                  <motion.div
                    key={interest.id}
                    className="flex-shrink-0 rounded-[1.2rem] border backdrop-blur-md p-2 md:p-3 flex items-center gap-1 md:gap-3 min-w-[90px] md:min-w-[180px] h-[40px] md:h-[60px]"
                    whileHover={{ 
                      scale: 1.05, 
                      transition: { 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 10 
                      } 
                    }}
                    style={{
                      backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(26,31,44,0.9)', // Dark Purple
                      borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(126,105,171,0.3)' // Secondary Purple
                    }}
                  >
                    <div 
                      className="flex items-center justify-center w-6 h-6 md:w-10 md:h-10 rounded-full" 
                      style={{ backgroundColor: `${interest.color}30` }}
                    >
                      <span style={{ color: isDark ? interest.color : '#fff' }}>
                        <interest.icon size={16} />
                      </span>
                    </div>
                    <span className="text-[0.7rem] md:text-sm font-medium whitespace-nowrap truncate text-white">
                      {interest.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fixed: Removed 'jsx' attribute from style tag */}
      <style>
        {`
        .infinite-scroll-left {
          overflow: hidden;
        }
        .infinite-scroll-left > div {
          animation: infiniteScrollLeft 40s linear infinite;
          width: fit-content;
        }
        .infinite-scroll-right {
          overflow: hidden;
        }
        .infinite-scroll-right > div {
          animation: infiniteScrollRight 40s linear infinite;
          width: fit-content;
        }
        
        @keyframes infiniteScrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-90px * 8 - 8px * 8));
          }
        }
        @keyframes infiniteScrollRight {
          0% {
            transform: translateX(calc(-90px * 8 - 8px * 8));
          }
          100% {
            transform: translateX(0);
          }
        }
        
        @media (min-width: 768px) {
          @keyframes infiniteScrollLeft {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-180px * 8 - 16px * 8));
            }
          }
          @keyframes infiniteScrollRight {
            0% {
              transform: translateX(calc(-180px * 8 - 16px * 8));
            }
            100% {
              transform: translateX(0);
            }
          }
        }
        `}
      </style>
    </section>
  );
};

export default InterestsSection;
