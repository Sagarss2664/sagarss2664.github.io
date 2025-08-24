import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/contexts/ThemeContext";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabSwitcherProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ 
  tabs, 
  activeTab, 
  onTabChange 
}) => {
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';

  return (
    <div className="flex justify-center mb-10 px-2 sm:px-0">
      <motion.div
        className={`
          ${isDark 
            ? 'backdrop-blur-md bg-black/40 border-white/10' 
            : 'backdrop-blur-md bg-light-dark/90 border-light-secondary/30 shadow-[0_8px_32px_rgba(0,0,0,0.25)]'
          }
          p-2 rounded-xl border shadow-[0_8px_32px_rgba(0,0,0,0.4)]
          grid grid-cols-${tabs.length} gap-2
          ${isMobile 
            ? 'w-full max-w-[95vw] sm:max-w-[90vw]' 
            : 'w-full max-w-4xl'
          }
        `}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab;
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative w-full py-4 rounded-lg text-sm font-medium
                transition-all flex items-center justify-center
                ${isDark
                  ? (isActive ? 'text-white' : 'text-white/70 hover:text-white')
                  : (isActive ? 'text-white' : 'text-gray-300 hover:text-white')
                }
              `}
              whileHover={{ scale: isActive ? 1.02 : 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Active background color */}
              {isActive && (
                <motion.span
                  className={`absolute inset-0 rounded-lg ${
                    isDark ? 'bg-accent/30' : 'bg-accent/60'
                  }`}
                  layoutId="tabBackground"
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 25 
                  }}
                />
              )}

              {/* Glow effect for active tab */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: isDark 
                      ? 'linear-gradient(45deg, rgba(255,255,255,0.15), rgba(255,87,51,0.2))'
                      : 'linear-gradient(45deg, rgba(126,105,171,0.25), rgba(155,135,245,0.25))',
                    filter: 'blur(10px)'
                  }}
                  animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* Tab content */}
              <span className="relative flex items-center gap-2 z-10 font-medium">
                {tab.icon}
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default TabSwitcher;
