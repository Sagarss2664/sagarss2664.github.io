
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/services/storageService';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ExternalLink, 
  Github, 
  Star, 
  Maximize2,
} from 'lucide-react';
import EditControls from '@/components/EditControls';

interface ProjectCardProps {
  project: Project;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isAdmin = false,
  onEdit,
  onDelete,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="project-card relative group glass-card rounded-xl overflow-hidden hover-glow border border-white/10 backdrop-blur-sm bg-black"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{
        y: -5,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      {/* Image */}
      <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
        <motion.img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ 
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Pinned indicator */}
        {project.pinned && (
          <motion.div 
            className="absolute top-2 right-2 text-accent"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Star className="fill-accent drop-shadow-glow" size={16} />
          </motion.div>
        )}
        
        {/* View details overlay */}
        <motion.div 
          className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            <Button variant="outline" size="sm" className="hover:bg-accent hover:text-white border-white/20 text-white text-xs md:text-sm px-2 md:px-3">
              <Maximize2 className="mr-1 h-3 w-3 md:h-4 md:w-4" />
              View Project
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5 bg-gradient-to-b from-black/50 to-black/80"
>
        <div className="flex justify-between items-start mb-2 md:mb-3">
          <h3 className="project-title text-base md:text-lg font-bold truncate max-w-[80%]">{project.title}</h3>
          
          {isAdmin && onEdit && onDelete && (
            <EditControls onEdit={onEdit} onDelete={onDelete} />
          )}
        </div>
        
        <p className="project-description text-xs md:text-sm line-clamp-2 mb-3 md:mb-4 hidden sm:block">

          {project.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3 md:mb-4 hidden sm:flex">
          {project.tags && project.tags.length > 0 ? (
            <>
              {project.tags.slice(0, 2).map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="project-tag text-[10px] md:text-xs bg-white/5 hover:bg-white/10 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 2 && (
                <Badge 
                  variant="outline" 
                  className="text-[10px] md:text-xs bg-white/5 hover:bg-white/10 transition-colors"
                >
                  +{project.tags.length - 2}
                </Badge>
              )}
            </>
          ) : null}
        </div>
        
        {/* Links */}
        <div className="flex gap-2 sm:gap-3">
          {project.url && (
            <Button 
              size="sm" 
              variant="outline" 
              asChild
              className="text-[10px] md:text-xs px-2 py-1 h-auto md:h-8 bg-white/5 hover:bg-accent hover:text-white transition-all duration-300 border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <ExternalLink className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Live</span>
              </a>
            </Button>
          )}
          
          {project.github && (
            <Button 
              size="sm" 
              variant="outline" 
              asChild
              className="text-[10px] md:text-xs px-2 py-1 h-auto md:h-8 bg-white/5 hover:bg-accent hover:text-white transition-all duration-300 border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Github className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Code</span>
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
