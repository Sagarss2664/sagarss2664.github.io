
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { SocialLink } from "@/services/storageService";
import { LucideIcon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
  iconSize?: number;
  showLabels?: boolean;
  infiniteScroll?: boolean;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ 
  links, 
  className = "",
  iconSize = 24,
  showLabels = false,
  infiniteScroll = false
}) => {
  const { theme } = useTheme();
  
  // Helper function to get platform-specific icon
  const getPlatformIcon = (platform: string): LucideIcon => {
    const iconMapping: Record<string, keyof typeof Icons> = {
      facebook: "Facebook",
      twitter: "Twitter",
      x: "Twitter",
      linkedin: "Linkedin",
      github: "Github",
      instagram: "Instagram",
      youtube: "Youtube",
      dribbble: "Dribbble",
      behance: "Figma",
      medium: "FileText",
      discord: "MessageSquare",
      telegram: "Send",
      whatsapp: "Phone",
      email: "Mail",
      gmail: "Mail",
      leetcode: "Code2"
    };

    const platformLower = platform.toLowerCase();
    
    const iconName = Object.keys(iconMapping).find(key => 
      platformLower.includes(key)
    );
    
    if (iconName) {
      return Icons[iconMapping[iconName]] as LucideIcon;
    }
    
    if (platform && typeof platform === 'string' && platform in Icons) {
      const IconComponent = Icons[platform as keyof typeof Icons];
      if (typeof IconComponent === 'function' && 'displayName' in IconComponent) {
        return IconComponent as LucideIcon;
      }
    }
    
    return Icons.Link;
  };

  // Get platform-specific colors
  const getPlatformColor = (platform: string): string => {
    const platformLower = platform.toLowerCase();
    
    if (platformLower.includes("facebook")) return "#1877F2";
    if (platformLower.includes("twitter") || platformLower.includes("x")) return "#1DA1F2";
    if (platformLower.includes("linkedin")) return "#0A66C2";
    if (platformLower.includes("github")) return "#FFFFFF";
    if (platformLower.includes("instagram")) return "#E4405F";
    if (platformLower.includes("youtube")) return "#FF0000";
    if (platformLower.includes("dribbble")) return "#EA4C89";
    if (platformLower.includes("behance")) return "#1769FF";
    if (platformLower.includes("medium")) return "#FFFFFF";
    if (platformLower.includes("discord")) return "#5865F2";
    if (platformLower.includes("telegram")) return "#26A5E4";
    if (platformLower.includes("whatsapp")) return "#25D366";
    if (platformLower.includes("email") || platformLower.includes("mail") || platformLower.includes("gmail")) return "#EA4335";
    if (platformLower.includes("leetcode")) return "#FFA116";
    
    return "#FFFFFF";
  };

  // Ultra-smooth animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.6,
        ease: [0.19, 1, 0.22, 1]
      }
    }
  };

  const item = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.8,
      rotateX: -90
    },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.19, 1, 0.22, 1]
      }
    }
  };

  // Ultra-smooth hover animation
  const iconHover = {
    rest: { 
      scale: 1, 
      rotate: 0,
      y: 0
    },
    hover: { 
      scale: 1.2, 
      rotate: 5,
      y: -3,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 15,
        duration: 0.4
      } 
    }
  };

  // Duplicate links for infinite scroll effect
  const displayLinks = infiniteScroll ? [...links, ...links, ...links] : links;

  if (infiniteScroll) {
    return (
      <div className={`w-full overflow-hidden py-4 ${className}`}>
        <motion.div 
          className="flex"
          animate={{ 
            x: [0, -2000]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear"
            }
          }}
        >
          {displayLinks.map((link, index) => {
            const IconComponent = getPlatformIcon(link.platform);
            const platformColor = getPlatformColor(link.platform);
            
            const isFirstOrLast = index < 3 || index > displayLinks.length - 4;
            const opacity = isFirstOrLast ? 0.5 : 1;
            
            return (
              <motion.a
                key={`${link.id || link.platform}-${index}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white mx-4 flex items-center justify-center"
                style={{ opacity }}
                whileHover={{ 
                  scale: 1.15, 
                  y: -8,
                  transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] }
                }}
              >
                <motion.div 
                  className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md"
                  style={{ 
                    backgroundColor: `${platformColor}30`,
                    boxShadow: `0 0 20px ${platformColor}40`
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 15px ${platformColor}40`,
                      `0 0 25px ${platformColor}60`,
                      `0 0 15px ${platformColor}40`
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: [0.19, 1, 0.22, 1]
                  }}
                >
                  <IconComponent 
                    size={iconSize} 
                    color={platformColor} 
                    strokeWidth={1.5}
                  />
                </motion.div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    );
  }

  // Regular social links display (non-scrolling)
  return (
    <motion.div 
      className={`flex flex-wrap items-center gap-4 ${className} social-links`}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {links.map((link, index) => {
        const IconComponent = getPlatformIcon(link.platform);
        const platformColor = getPlatformColor(link.platform);
        
        return (
          <motion.a
            key={link.id || index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-all duration-500 flex items-center gap-2 
                      backdrop-blur-md p-2.5 rounded-full 
                      hover:shadow-[0_0_25px_rgba(155,135,245,0.6)] border 
                      ${theme === 'dark' 
                        ? 'bg-gradient-to-br from-black/60 to-black/40 border-white/10' 
                        : 'bg-light-dark/90 border-white/10 shadow-md'} btn-hover`}
            variants={item}
            whileHover="hover"
            initial="rest"
            title={link.platform}
            style={{ 
              borderColor: `${platformColor}30`
            }}
          >
            <motion.div 
              variants={iconHover}
              className="relative"
              style={{ color: theme === 'light' ? 'white' : platformColor }}
            >
              <IconComponent 
                size={iconSize} 
                strokeWidth={1.5}
              />
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 blur-sm opacity-50 pointer-events-none"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: [0.19, 1, 0.22, 1]
                }}
                style={{ 
                  background: `radial-gradient(circle, ${platformColor}60, transparent)`
                }}
              />
            </motion.div>
            
            {showLabels && (
              <motion.span 
                className="text-sm hidden md:inline pr-2 text-white"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2, ease: [0.19, 1, 0.22, 1] }
                }}
              >
                {link.platform}
              </motion.span>
            )}
            {!showLabels && <span className="sr-only">{link.platform}</span>}
          </motion.a>
        );
      })}
    </motion.div>
  );
};

export default SocialLinks;
