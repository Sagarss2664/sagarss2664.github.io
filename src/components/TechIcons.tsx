
import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface TechIcon {
  name: string;
  color: string;
  icon: string;
}

const TechIcons = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px 0px" });
  const isMobile = useIsMobile();
  
  const techIcons: TechIcon[] = [
    { name: "HTML", color: "#E34F26", icon: "/lovable-uploads/5ec496ac-68d2-4e83-a14a-813368da5c5a.png" },
    { name: "CSS", color: "#1572B6", icon: "/lovable-uploads/5ec496ac-68d2-4e83-a14a-813368da5c5a.png" },
    { name: "JavaScript", color: "#F7DF1E", icon: "/lovable-uploads/5ec496ac-68d2-4e83-a14a-813368da5c5a.png" },
    { name: "React", color: "#61DAFB", icon: "/lovable-uploads/5ec496ac-68d2-4e83-a14a-813368da5c5a.png" },
    { name: "TypeScript", color: "#3178C6", icon: "/lovable-uploads/5ec496ac-68d2-4e83-a14a-813368da5c5a.png" },
    { name: "Node.js", color: "#339933", icon: "/lovable-uploads/5ec496ac-68d2-4e83-a14a-813368da5c5a.png" },
    { name: "Python", color: "#3776AB", icon: "/lovable-uploads/5ec496ac-68d2-4e83-a14a-813368da5c5a.png" },
    { name: "Java", color: "#f0931c", icon: "/lovable-uploads/5ec496ac-68d2-4e83-a14a-813368da5c5a.png" },
    { name: "C", color: "#4285f4", icon: "/lovable-uploads/5ec496ac-68d2-4e83-a14a-813368da5c5a.png" },
    { name: "MongoDB", color: "#13aa52", icon: "/lovable-uploads/5ec496ac-68d2-4e83-a14a-813368da5c5a.png" },
    { name: "UI/UX Design", color: "#ff7262", icon: "/lovable-uploads/5ec496ac-68d2-4e83-a14a-813368da5c5a.png" },
    { name: "AWS", color: "#ff9900", icon: "/lovable-uploads/5ec496ac-68d2-4e83-a14a-813368da5c5a.png" },
  ];

  // Ultra-smooth animation variants
  const containerVariants = {
    hidden: { 
      opacity: 0 
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
        duration: 0.6,
        ease: [0.19, 1, 0.22, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.8,
      rotateX: -90,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.6,
        ease: [0.19, 1, 0.22, 1]
      }
    }
  };

  return (
    <div className="w-full overflow-hidden py-6" ref={containerRef}>
      <motion.div 
        className="flex flex-wrap gap-4 justify-center"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {techIcons.map((icon, index) => (
          <motion.div
            key={`${icon.name}-${index}`}
            className="flex items-center justify-center mx-4 relative group"
            variants={itemVariants}
            whileHover={{ 
              y: -8, 
              scale: 1.15,
              rotateY: 5,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 15,
                duration: 0.4
              }
            }}
          >
            <motion.div 
              className="w-28 sm:w-32 h-12 sm:h-14 flex items-center justify-center rounded-full bg-black/40 border border-white/10 backdrop-blur-md px-4 overflow-hidden btn-hover"
              whileHover={{ 
                borderColor: "rgba(255,255,255,0.6)",
                boxShadow: "0 0 30px rgba(255,255,255,0.3)",
                backgroundColor: "rgba(0,0,0,0.6)",
                transition: {
                  duration: 0.4,
                  ease: [0.19, 1, 0.22, 1]
                }
              }}
              animate={{
                boxShadow: [
                  "0 0 10px rgba(255,255,255,0.1)",
                  "0 0 20px rgba(255,255,255,0.2)",
                  "0 0 10px rgba(255,255,255,0.1)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: [0.19, 1, 0.22, 1]
              }}
            >
              <motion.img 
                src={icon.icon} 
                alt={icon.name}
                className="w-6 h-6 mr-2 object-contain"
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] }
                }}
              />
              <motion.span 
                className="text-sm font-medium"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2, ease: [0.19, 1, 0.22, 1] }
                }}
              >
                {icon.name}
              </motion.span>

              {/* Enhanced flash-slide animation */}
              <motion.div
                className="absolute inset-0 rounded-full overflow-hidden"
                initial={false}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{
                    x: ["-100%", "200%"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: [0.19, 1, 0.22, 1],
                    repeatDelay: 2
                  }}
                />
              </motion.div>
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${icon.color}40, transparent)`
                }}
                whileHover={{
                  opacity: 0.6,
                  scale: 1.2,
                  transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] }
                }}
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechIcons;
