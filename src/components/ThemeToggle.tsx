
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.button
      onClick={toggleTheme}
      className={`flex items-center justify-center rounded-full w-10 h-10 p-2 
        transition-all duration-500 shadow-md
        ${theme === 'dark' 
          ? 'bg-background/40 backdrop-blur-md border border-white/10 hover:bg-background/60'
          : 'bg-light-dark backdrop-blur-md border border-white/10 hover:bg-light-dark/100'}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, rotate: -20 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      aria-label="Toggle theme"
    >
      <motion.div
        key={theme}
        initial={{ y: -10, opacity: 0, rotate: -10 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {theme === 'dark' ? (
          <Sun size={20} className="text-white" />
        ) : (
          <Moon size={20} className="text-white" />
        )}
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </motion.button>
  );
}
