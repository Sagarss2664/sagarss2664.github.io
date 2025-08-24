import { useState } from "react";
import { motion } from "framer-motion";
import { Project } from "@/services/storageService";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import ProjectForm from "./ProjectForm";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProjectsSectionProps {
  projects: Project[];
  isAdmin?: boolean;
  onAddProject?: (project: Omit<Project, "id">) => void;
  onUpdateProject?: (project: Project) => void;
  onDeleteProject?: (id: string) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  isAdmin = false,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Get featured projects (pinned)
  const featuredProjects = projects.filter(project => project.pinned);
  // Get other projects and make sure we have at least 3 for the display
  const otherProjects = projects.filter(project => !project.pinned);

  // Handle project card click
  const handleProjectClick = (project: Project) => {
    if (!isAdmin) {
      setSelectedProject(project);
      setIsModalOpen(true);
    }
  };

  // Handle edit project
  const handleEditProject = (project: Project) => {
    setProjectToEdit(project);
    setIsFormOpen(true);
  };

  // Handle delete project
  const handleDeleteProject = (project: Project) => {
    setProjectToDelete(project);
    setIsDeleteDialogOpen(true);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (projectToDelete && onDeleteProject) {
      onDeleteProject(projectToDelete.id);
      toast({
        title: "Project deleted",
        description: `"${projectToDelete.title}" has been deleted successfully.`,
      });
    }
    setIsDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  // Handle save project
  const handleSaveProject = (project: Omit<Project, "id"> | Project) => {
    if ("id" in project && onUpdateProject) {
      onUpdateProject(project);
      toast({
        title: "Project updated",
        description: `"${project.title}" has been updated successfully.`,
      });
    } else if (onAddProject) {
      onAddProject(project);
      toast({
        title: "Project added",
        description: `"${project.title}" has been added successfully.`,
      });
    }
    setIsFormOpen(false);
    setProjectToEdit(null);
  };

  // Handle add new project
  const handleAddProject = () => {
    setProjectToEdit(null);
    setIsFormOpen(true);
  };

  return (
    <section id="projects" className="py-16 min-h-screen">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Projects" 
          subtitle="Check out some of the projects I've worked on."
        />
        
        {isAdmin && onAddProject && (
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button onClick={handleAddProject}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Project
            </Button>
          </motion.div>
        )}

        {/* Featured Projects - Desktop View with Large Cards */}
        {!isMobile && featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-playfair font-medium mb-8 text-center md:text-left">
              Featured Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {featuredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="relative group overflow-hidden rounded-xl bg-black/20 backdrop-blur-lg hover-glow border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, margin: "-100px" }}
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                    <motion.div 
                      className="bg-gradient-to-b from-transparent to-black/90 z-10 absolute inset-0 flex flex-col justify-end p-8"
                      initial={{ opacity: 0.6 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex flex-col gap-4">
                        <div>
                          <h3 className="text-3xl md:text-4xl font-bold text-gradient mb-2">{project.title}</h3>
                          <p className="text-white/80 text-lg mb-4 line-clamp-2">{project.description}</p>
                        </div>

                        <div className="flex gap-3 items-center justify-start">
                          {project.url && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              asChild
                              className="bg-white/5 hover:bg-accent hover:text-white transition-all duration-300 border-white/20"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <a 
                                href={project.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center"
                              >
                                View Live
                              </a>
                            </Button>
                          )}
                          
                          {project.github && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              asChild
                              className="bg-white/5 hover:bg-accent hover:text-white transition-all duration-300 border-white/20"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <a 
                                href={project.github} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center"
                              >
                                View Code
                              </a>
                            </Button>
                          )}

                          {isAdmin && (
                            <div className="ml-auto">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditProject(project);
                                }}
                                className="mr-2"
                              >
                                Edit
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteProject(project);
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>

                    <motion.img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Featured Projects - Mobile View as Carousel */}
        {isMobile && featuredProjects.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-playfair font-medium mb-6 text-center">
              Featured Projects
            </h3>
            <Carousel className="w-full">
              <CarouselContent>
                {featuredProjects.map((project) => (
                  <CarouselItem key={project.id} className="md:basis-1/1">
                    <div 
                      className="relative rounded-lg overflow-hidden h-[250px]"
                      onClick={() => handleProjectClick(project)}
                    >
                      <img 
                        src={project.image || "/placeholder.svg"} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent p-4 flex flex-col justify-end">
                        <h4 className="text-xl font-bold">{project.title}</h4>
                        <p className="text-sm text-white/70 line-clamp-2 my-1">{project.description}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-4">
                <CarouselPrevious className="relative static translate-y-0 left-0 mr-4" />
                <CarouselNext className="relative static translate-y-0 right-0" />
              </div>
            </Carousel>
          </div>
        )}

        {/* Other Projects with vertical layout for mobile */}
        <div className="mt-12">
          <h3 className="text-2xl font-playfair font-medium mb-8 text-center">
            More Projects
          </h3>

          {/* Desktop layout - Grid */}
          {!isMobile && (
            <div className="grid grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isAdmin={isAdmin}
                  onEdit={isAdmin ? () => handleEditProject(project) : undefined}
                  onDelete={isAdmin ? () => handleDeleteProject(project) : undefined}
                  onClick={() => handleProjectClick(project)}
                />
              ))}
            </div>
          )}
          
          {/* Mobile layout - Vertical cards */}
          {isMobile && (
            <div className="flex flex-col space-y-6">
              {otherProjects.map((project) => (
                <div 
                  key={project.id}
                  className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="relative h-[180px] overflow-hidden">
                    <img 
                      src={project.image || "/placeholder.svg"} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                    <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        {project.url && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            asChild
                            className="text-xs bg-white/5 border-white/10"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <a href={project.url} target="_blank" rel="noopener noreferrer">
                              Live
                            </a>
                          </Button>
                        )}
                        {project.github && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            asChild
                            className="text-xs bg-white/5 border-white/10"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              Code
                            </a>
                          </Button>
                        )}
                      </div>
                      {isAdmin && (
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="text-xs h-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditProject(project);
                            }}
                          >
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            className="text-xs h-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteProject(project);
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Project details modal (non-admin view) */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        
        {/* Project form dialog (admin view) */}
        <ProjectForm
          project={projectToEdit}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveProject}
        />
        
        {/* Delete confirmation dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the project 
                <strong className="font-semibold">
                  {projectToDelete ? ` "${projectToDelete.title}"` : ""}
                </strong>. 
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleConfirmDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
};

export default ProjectsSection;
