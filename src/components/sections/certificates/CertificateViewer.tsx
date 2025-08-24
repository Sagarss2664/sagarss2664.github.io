
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Certificate } from "@/services/storageService";
import { Button } from "@/components/ui/button";
import { Download, X, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface CertificateViewerProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: Certificate;
}

const CertificateViewer: React.FC<CertificateViewerProps> = ({
  isOpen,
  onClose,
  certificate
}) => {
  const isMobile = useIsMobile();

  const handleDownload = () => {
    if (certificate.image) {
      const link = document.createElement('a');
      link.href = certificate.image;
      link.download = `${certificate.title} - ${certificate.issuer}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  const imageUrl = certificate.image;
  
  // On mobile, use Sheet component for better UX
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full max-w-full sm:max-w-full p-0 bg-black/95 border-white/10 overflow-hidden">
          <SheetHeader className="p-4 text-center relative z-10 border-b border-white/10">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-2 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
              onClick={onClose}
            >
              <X size={18} />
            </Button>
            <SheetTitle className="text-xl font-playfair text-gradient flex items-center justify-center gap-2">
              <Award size={18} className="text-accent" />
              {certificate.title}
            </SheetTitle>
            <DialogDescription className="text-sm text-white/70">
              Issued by {certificate.issuer}
            </DialogDescription>
          </SheetHeader>
          
          <div className="relative overflow-hidden p-4">
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    duration: 0.6
                  }}
                  className="flex flex-col items-center"
                >
                  <div className="relative w-full aspect-[1.414/1] bg-gradient-to-b from-accent/5 to-transparent rounded-lg overflow-hidden shadow-lg border border-white/10">
                    {imageUrl && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.img 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          src={imageUrl} 
                          alt={`${certificate.title} Certificate`}
                          className="max-w-full max-h-full object-contain p-2"
                        />
                      </div>
                    )}
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex justify-center mt-6 mb-2"
                  >
                    <Button 
                      variant="outline"
                      className="bg-white/5 hover:bg-accent hover:text-white border-white/20 text-white gap-2 transition-all duration-300"
                      onClick={handleDownload}
                    >
                      <Download size={16} />
                      Download Certificate
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </SheetContent>
      </Sheet>
    );
  }
  
  // Desktop view with Dialog
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[90vw] p-0 bg-black/95 border-white/10 overflow-hidden">
        <DialogHeader className="p-4 text-center relative z-10 border-b border-white/10">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-2 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
            onClick={onClose}
          >
            <X size={18} />
          </Button>
          <DialogTitle className="text-xl font-playfair text-gradient flex items-center justify-center gap-2">
            <Award size={18} className="text-accent" />
            {certificate.title}
          </DialogTitle>
          <DialogDescription className="text-sm text-white/70">
            Issued by {certificate.issuer}
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative overflow-hidden p-6">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30,
                  duration: 0.7
                }}
                className="flex flex-col items-center"
              >
                <div className="relative w-full max-w-3xl mx-auto aspect-[1.414/1] bg-gradient-to-b from-accent/5 to-transparent rounded-lg overflow-hidden shadow-lg border border-white/10">
                  {imageUrl && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.img 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        src={imageUrl} 
                        alt={`${certificate.title} Certificate`}
                        className="max-w-full max-h-full object-contain p-2"
                      />
                    </div>
                  )}
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex justify-center mt-6"
                >
                  <Button 
                    variant="outline"
                    className="bg-white/5 hover:bg-accent hover:text-white border-white/20 text-white gap-2 transition-all duration-500"
                    onClick={handleDownload}
                  >
                    <Download size={16} />
                    Download Certificate
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateViewer;
