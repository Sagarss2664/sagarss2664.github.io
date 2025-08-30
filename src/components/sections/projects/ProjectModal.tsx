
// import { useState } from "react";
// import { 
//   Dialog, 
//   DialogContent, 
//   DialogHeader, 
//   DialogTitle
// } from "@/components/ui/dialog";
// import { 
//   ExternalLink, 
//   Github, 
//   Star,
//   Calendar,
//   Tag
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Project } from "@/services/storageService";
// import { motion, AnimatePresence } from "framer-motion";

// interface ProjectModalProps {
//   project: Project | null;
//   isOpen: boolean;
//   onClose: () => void;
// }

// const ProjectModal: React.FC<ProjectModalProps> = ({
//   project,
//   isOpen,
//   onClose,
// }) => {
//   if (!project) return null;

//   const cardVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: [0.22, 1, 0.36, 1]
//       } 
//     },
//     exit: {
//       opacity: 0,
//       y: -50,
//       transition: {
//         duration: 0.4
//       }
//     }
//   };

//   const contentVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: {
//         delay: 0.3,
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: {
//         duration: 0.5
//       }
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
//       <DialogContent className="project-modal sm:max-w-2xl overflow-hidden bg-card/95 backdrop-blur-xl border border-white/10 p-0 rounded-xl">
//         <motion.div
//           variants={cardVariants}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//         >
//           {/* Image Section */}
//           <div className="relative w-full h-64 overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
//             <img 
//               src={project.image || "/placeholder.svg"} 
//               alt={project.title}
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
//               <DialogHeader>
//                 <DialogTitle className="project-title text-xl font-bold drop-shadow-md flex items-center gap-2">
//                   {project.title}
//                   {project.pinned && (
//                     <Star className="ml-2 fill-accent text-accent" size={18} />
//                   )}
//                 </DialogTitle>
//               </DialogHeader>
//             </div>
//           </div>
          
//           {/* Content Section */}
//           <div className="p-6">
//             <motion.div 
//               className="space-y-5"
//               variants={contentVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               <motion.p 
//                 className="text-muted-foreground"
//                 variants={itemVariants}
//               >
//                 {project.description}
//               </motion.p>
              
//               <motion.div variants={itemVariants}>
//                 <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
//                   <Tag size={16} className="text-accent" />
//                   Technologies
//                 </h4>
//                 <div className="flex flex-wrap gap-1">
//                   {project.tags && project.tags.map((tag, index) => (
//                     <Badge key={index} variant="outline" className="bg-white/5 hover:bg-white/10 transition-colors">
//                       {tag}
//                     </Badge>
//                   ))}
//                 </div>
//               </motion.div>
              
//               <motion.div 
//                 className="flex flex-wrap gap-2 pt-2"
//                 variants={itemVariants}
//               >
//                 {project.url && (
//                   <Button 
//                     asChild
//                     className="bg-accent hover:bg-accent/90 text-white transition-all"
//                   >
//                     <a 
//                       href={project.url} 
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       className="flex items-center"
//                     >
//                       <ExternalLink className="mr-2 h-4 w-4" />
//                       Visit Project
//                     </a>
//                   </Button>
//                 )}
                
//                 {project.github && (
//                   <Button 
//                     variant="outline" 
//                     asChild
//                     className="border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
//                   >
//                     <a 
//                       href={project.github} 
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       className="flex items-center"
//                     >
//                       <Github className="mr-2 h-4 w-4" />
//                       View Code
//                     </a>
//                   </Button>
//                 )}
//               </motion.div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ProjectModal;
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { 
  ExternalLink, 
  Github, 
  Star,
  Calendar,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/services/storageService";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  if (!project) return null;

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      } 
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.4
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        delay: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="project-modal sm:max-w-2xl overflow-hidden bg-card/95 backdrop-blur-xl border border-white/10 p-0 rounded-xl">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Image Section - Fixed the grey area issue */}
          <div className="relative w-full h-64 overflow-hidden bg-card">
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80 z-10" />
            <img 
              src={project.image || "/placeholder.svg"} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
              <DialogHeader>
                <DialogTitle className="project-title text-xl font-bold drop-shadow-md flex items-center gap-2">
                  {project.title}
                  {project.pinned && (
                    <Star className="ml-2 fill-accent text-accent" size={18} />
                  )}
                </DialogTitle>
              </DialogHeader>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="p-6">
            <motion.div 
              className="space-y-5"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.p 
                className="project-description"
                variants={itemVariants}
              >
                {project.description}
              </motion.p>
              
              <motion.div variants={itemVariants}>
                <h2 className="technologies-heading text-sm font-semibold mb-2 flex items-center gap-2">

                  <Tag size={16} className="text-accent" />
                  Technologies
                </h2>
                <div className="flex flex-wrap gap-1">
                  {project.tags && project.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="project-tag bg-white/5 hover:bg-white/10 transition-colors">
                      {tag}
                    </Badge>
                  ))}
                </div>
          
              </motion.div>
              
              <motion.div 
                className="flex flex-wrap gap-2 pt-2"
                variants={itemVariants}
              >
                {project.url && (
                  <Button 
                    asChild
                    className="bg-accent hover:bg-accent/90 text-white transition-all"
                  >
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Project
                    </a>
                  </Button>
                )}
                
                {project.github && (
                  <Button 
  variant="outline" 
  asChild
  className="view-code-btn border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
>
  <a 
    href={project.github} 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex items-center"
  >
    <Github className="mr-2 h-4 w-4" />
    View Code
  </a>
</Button>
                )}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
