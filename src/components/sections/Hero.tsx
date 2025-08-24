
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Image from "@/components/ui/image";
import { ProfileInfo, SocialLink } from "@/services/storageService";
import SocialLinks from "@/components/SocialLinks";
import { Button } from "@/components/ui/button";
import { ArrowDown, ExternalLink } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/contexts/ThemeContext";

interface HeroProps {
  profile: ProfileInfo;
  socialLinks: SocialLink[];
  isAdmin?: boolean;
  onEditProfile?: () => void;
  onEditSocial?: () => void;
}

const Hero: React.FC<HeroProps> = ({
  profile,
  socialLinks,
  isAdmin = false,
  onEditProfile,
  onEditSocial
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { theme } = useTheme();

  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth"
      });
    }
  };

  // Ultra-smooth animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        duration: 0.8,
        ease: [0.19, 1, 0.22, 1]
      }
    }
  };

  const nameVariants = {
    hidden: { 
      y: 40, 
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 1.2, 
        ease: [0.19, 1, 0.22, 1],
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 30, 
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.19, 1, 0.22, 1]
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 1, -1, 0],
      transition: {
        duration: 6,
        ease: [0.19, 1, 0.22, 1],
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  return (
    <section className="relative min-h-[100vh] flex flex-col justify-center px-6 overflow-hidden">
      <div className="container mx-auto max-w-6xl flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
        {/* Content */}
        <motion.div 
          className="w-full md:w-1/2 text-center md:text-left z-10" 
          variants={containerVariants}
          initial="hidden" 
          animate="visible" 
        >
          <motion.div variants={nameVariants} className="mb-6 overflow-hidden relative">
            <motion.h1 
              className={`font-playfair text-5xl md:text-6xl lg:text-7xl font-extrabold ${
                theme === 'dark' ? 'text-gradient' : 'text-light-dark'
              } leading-tight`}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] }
              }}
            >
              {profile.name}
            </motion.h1>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <motion.h2 
              className={`font-playfair ${isMobile ? 'text-xl' : 'text-2xl md:text-3xl lg:text-4xl'} font-medium mb-6 ${
                theme === 'dark' ? 'text-accent/90' : 'text-light-secondary'
              }`}
              whileHover={{
                scale: 1.01,
                transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] }
              }}
            >
              {profile.title}
            </motion.h2>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mb-6">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                className={`flex items-center gap-2 ${
                  theme === 'dark' 
                    ? 'bg-black/30 backdrop-blur-md border border-green-500/20' 
                    : 'bg-light-dark backdrop-blur-md border border-green-500/20 shadow-sm'
                } rounded-full px-4 py-1.5 badge-glow`}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)",
                  transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] }
                }}
              >
                <span className="relative flex h-3 w-3">
                  <motion.span 
                    className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.75, 0.3, 0.75]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: [0.19, 1, 0.22, 1]
                    }}
                  />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-green-500 text-sm font-medium">Open to Work</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.p 
              className={`${isMobile ? 'text-base' : 'text-lg'} ${
                theme === 'dark' ? 'text-muted-foreground' : 'text-light-dark/80'
              } mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed`}
              whileHover={{
                scale: 1.01,
                transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] }
              }}
            >
              {profile.bio}
            </motion.p>
          </motion.div>

          {/* View Resume CTA */}
          <motion.div variants={itemVariants} className="mb-4">
            <a href="/#/resume" aria-label="View Resume" className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium bg-accent text-white hover:bg-accent/90 transition-colors hover-scale">
              View Resume
            </a>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-5 items-center justify-center md:justify-start"
          >
            <motion.div 
              className="flex items-center"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] }
              }}
            >
              <SocialLinks links={socialLinks} iconSize={20} className="mt-1" />
              {isAdmin && onEditSocial && (
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="ml-2 hover-scale" 
                  onClick={onEditSocial}
                >
                  <ExternalLink size={16} />
                </Button>
              )}
            </motion.div>
            
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] }
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
            >
              <Button 
                onClick={handleContactClick} 
                size="lg" 
                className={`mt-2 sm:mt-0 text-base font-semibold transition-all duration-500 rounded-xl btn-hover ${
                  theme === 'dark'
                    ? 'text-black bg-white hover:bg-white/90 shadow-[0_0_15px_rgba(255,255,255,0.5)]'
                    : 'bg-light-secondary text-white hover:bg-light-tertiary shadow-md'
                }`}
              >
                Contact Me
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div 
          className="w-full md:w-1/2 relative mb-8 md:mb-0 z-10" 
          initial={{ opacity: 0, scale: 0.8, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
        >
          <motion.div 
            className="relative max-w-md mx-auto"
            variants={floatingVariants}
            animate="animate"
          >
            <motion.div 
              className={`aspect-square rounded-full overflow-hidden border-2 ${
                theme === 'dark' ? 'border-white/10' : 'border-light-secondary/30'
              } hover-glow`}
              whileHover={{
                scale: 1.05,
                rotate: 2,
                transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] }
              }}
              animate={{
                boxShadow: theme === 'dark' 
                  ? [
                      "0 0 20px rgba(255,255,255,0.1)",
                      "0 0 40px rgba(255,255,255,0.2)",
                      "0 0 20px rgba(255,255,255,0.1)"
                    ]
                  : [
                      "0 0 20px rgba(126,105,171,0.2)",
                      "0 0 40px rgba(126,105,171,0.3)",
                      "0 0 20px rgba(126,105,171,0.2)"
                    ]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: [0.19, 1, 0.22, 1]
              }}
            >
              <Image
                src="/lovable-uploads/6f0800b3-624d-42cd-9762-3cbe10931da5.jpg"
                alt="Profile Picture"
                className="w-full h-full profile-image object-cover"
                loading="eager"
                fallbackSrc="/placeholder.svg"
                decoding="async"
              />
            </motion.div>
            {isAdmin && onEditProfile && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button 
                  size="icon" 
                  className="absolute bottom-4 right-4 rounded-full opacity-80 hover:opacity-100 btn-hover" 
                  onClick={onEditProfile}
                >
                  <ExternalLink size={16} />
                </Button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 ${
          theme === 'dark' ? 'text-white/50' : 'text-light-secondary'
        } hover-scale`}
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ 
          duration: 0.8, 
          delay: 1.5,
          ease: [0.19, 1, 0.22, 1]
        }}
        whileHover={{
          scale: 1.2,
          y: -5,
          transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] }
        }}
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: [0.19, 1, 0.22, 1]
          }}
        >
          <ArrowDown className="w-8 h-8" />
        </motion.div>
      </motion.div>

      {/* Enhanced glow effects */}
      {theme === 'dark' && (
        <>
          <motion.div 
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-accent/10 filter blur-[80px] -z-0"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: [0.19, 1, 0.22, 1]
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500/10 filter blur-[100px] -z-0"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: [0.19, 1, 0.22, 1],
              delay: 2
            }}
          />
        </>
      )}
    </section>
  );
};

export default Hero;
