
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import SocialLinks from "./SocialLinks";
import { SocialLink } from "@/services/storageService";
import { Link } from "react-router-dom"; // 👈 add this

interface FooterProps {
  socialLinks: SocialLink[];
}

const Footer: React.FC<FooterProps> = ({ socialLinks }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-white/10">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <SocialLinks 
              links={socialLinks} 
              className="mb-4" 
              iconSize={24}
            />
          </motion.div>

          {/* Resume button at the end */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <Link
    to="/#/resume" // 👈 this automatically becomes #/resume in HashRouter
    className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-accent/90 text-white hover:bg-accent transition-colors"
  >
    View Resume
  </Link>
          </motion.div>
          
          <motion.p
            className="text-sm text-muted-foreground text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            © {currentYear} Sagar Shegunashi. All rights reserved.
          </motion.p>
          
          <motion.p
            className="text-xs text-muted-foreground mt-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Made by Sagar Shegunashi
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
