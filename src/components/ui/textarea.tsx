
import * as React from "react"
import { useTheme } from "@/contexts/ThemeContext"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const { theme } = useTheme();
    
    // Instead of using motion.textarea directly, we'll use a regular textarea
    // with framer-motion animations applied through the whileFocus prop pattern
    return (
      <div className="relative">
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
            theme === 'light' 
              ? "text-[#1A1F2C] border-gray-400 focus:border-[#7E69AB] bg-white/80" 
              : "",
            className
          )}
          ref={ref}
          {...props}
        />
        <motion.div 
          className="absolute inset-0 pointer-events-none rounded-md"
          initial={{ scale: 1 }}
          whileFocus={{ scale: 1.01 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 25 
          }}
        />
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
