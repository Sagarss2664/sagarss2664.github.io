
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  isAdmin?: boolean;
  onEdit?: () => void;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  className,
  isAdmin = false,
  onEdit
}) => {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });
  
  // Ultra-smooth animation variants
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.19, 1, 0.22, 1],
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };
  
  const childVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.19, 1, 0.22, 1]
      }
    }
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.19, 1, 0.22, 1]
      }
    }
  };
  
  return (
    <motion.div 
      ref={ref}
      className={cn("flex flex-col items-center text-center mb-10 px-4", className)} 
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      viewport={{
        once: true,
        margin: "-50px"
      }}
    >
      <motion.div variants={childVariants} className="relative">
        <motion.h2 
          className={`font-playfair text-3xl mb-3 font-bold md:text-5xl ${
            theme === 'dark' 
              ? 'text-gradient' 
              : 'text-[#1A1F2C]'
          } relative overflow-hidden`}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] }
          }}
        >
          {theme === 'dark' ? (
            <span className="inline-block">{title}</span>
          ) : (
            <motion.span className="inline-block">
              {title.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  custom={index}
                  className="inline-block"
                  whileHover={{
                    y: -3,
                    transition: { duration: 0.2, ease: [0.19, 1, 0.22, 1] }
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </motion.span>
          )}

          
          {/* Animated underline */}
          <motion.div
            className={`absolute bottom-0 left-0 h-1 ${
              theme === 'dark' ? 'bg-gradient-to-r from-accent to-blue-500' : 'bg-gradient-to-r from-[#7E69AB] to-[#9b87f5]'
            } rounded-full`}
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : { width: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.5 }}
          />
        </motion.h2>
      </motion.div>
      
      {subtitle && (
        <motion.div variants={childVariants} className="relative">
          <motion.p 
            className={`${
              theme === 'dark' 
                ? 'text-muted-foreground' 
                : 'text-[#1A1F2C]'
            } max-w-2xl font-medium relative`}
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] }
            }}
          >
            {subtitle}
            
            {/* Subtle glow effect */}
            <motion.div
              className="absolute inset-0 blur-md opacity-30 pointer-events-none"
              style={{
                background: theme === 'dark' 
                  ? 'linear-gradient(45deg, rgba(255,87,51,0.1), rgba(59,130,246,0.1))' 
                  : 'linear-gradient(45deg, rgba(126,105,171,0.1), rgba(155,135,245,0.1))'
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: [0.19, 1, 0.22, 1]
              }}
            />
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SectionHeading;
