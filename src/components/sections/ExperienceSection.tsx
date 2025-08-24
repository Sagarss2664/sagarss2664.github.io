
import { useState } from "react";
import { motion } from "framer-motion";
import { Experience } from "@/services/storageService";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
import { Briefcase, Building, Edit, Plus, Trash, X } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import EditControls from "@/components/EditControls";

interface ExperienceSectionProps {
  experience: Experience[];
  isAdmin?: boolean;
  onAddExperience?: (experience: Omit<Experience, "id">) => void;
  onUpdateExperience?: (experience: Experience) => void;
  onDeleteExperience?: (id: string) => void;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  isAdmin = false,
  onAddExperience,
  onUpdateExperience,
  onDeleteExperience,
}) => {
  const [experienceToEdit, setExperienceToEdit] = useState<Experience | null>(null);
  const [experienceToDelete, setExperienceToDelete] = useState<Experience | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [currentTech, setCurrentTech] = useState("");
  const { toast } = useToast();

  // Format date
  const formatDate = (dateString: string) => {
    if (dateString === "Present") return "Present";
    try {
      return format(new Date(dateString), "MMM yyyy");
    } catch (error) {
      return dateString;
    }
  };

  // Handle edit experience
  const handleEditExperience = (experience: Experience) => {
    setExperienceToEdit(experience);
    setCompany(experience.company);
    setPosition(experience.position);
    setStartDate(experience.startDate);
    setEndDate(experience.endDate);
    setDescription(experience.description);
    setTechnologies(experience.technologies || []);
    setIsFormOpen(true);
  };

  // Handle delete experience
  const handleDeleteExperience = (experience: Experience) => {
    setExperienceToDelete(experience);
    setIsDeleteDialogOpen(true);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (experienceToDelete && onDeleteExperience) {
      onDeleteExperience(experienceToDelete.id);
      toast({
        title: "Experience entry deleted",
        description: `"${experienceToDelete.position} at ${experienceToDelete.company}" has been deleted successfully.`,
      });
    }
    setIsDeleteDialogOpen(false);
    setExperienceToDelete(null);
  };

  // Handle add technology
  const handleAddTechnology = () => {
    if (currentTech.trim() && !technologies.includes(currentTech.trim())) {
      setTechnologies([...technologies, currentTech.trim()]);
      setCurrentTech("");
    }
  };

  // Handle remove technology
  const handleRemoveTechnology = (techToRemove: string) => {
    setTechnologies(technologies.filter(tech => tech !== techToRemove));
  };

  // Handle key down on technology input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTechnology();
    }
  };

  // Handle save experience
  const handleSaveExperience = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedExperience = {
      ...(experienceToEdit && { id: experienceToEdit.id }),
      company,
      position,
      startDate,
      endDate,
      description,
      technologies: technologies.length > 0 ? technologies : undefined,
    };
    
    if (experienceToEdit && onUpdateExperience) {
      onUpdateExperience(updatedExperience as Experience);
      toast({
        title: "Experience entry updated",
        description: `"${position} at ${company}" has been updated successfully.`,
      });
    } else if (onAddExperience) {
      onAddExperience(updatedExperience);
      toast({
        title: "Experience entry added",
        description: `"${position} at ${company}" has been added successfully.`,
      });
    }
    
    setIsFormOpen(false);
    resetForm();
  };

  // Handle add new experience
  const handleAddExperience = () => {
    resetForm();
    setIsFormOpen(true);
  };

  // Reset form
  const resetForm = () => {
    setExperienceToEdit(null);
    setCompany("");
    setPosition("");
    setStartDate("");
    setEndDate("");
    setDescription("");
    setTechnologies([]);
    setCurrentTech("");
  };

  // Sort experience by end date (newest first)
  const sortedExperience = [...experience].sort((a, b) => {
    if (a.endDate === "Present") return -1;
    if (b.endDate === "Present") return 1;
    return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
  });

  return (
    <section id="experience" className="py-16">
      <div className="container mx-auto">
        <SectionHeading 
          title="Experience" 
          subtitle="My professional journey and work history."
        />
        
        {isAdmin && onAddExperience && (
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button onClick={handleAddExperience}>
              <Plus className="mr-2 h-4 w-4" />
              Add Experience
            </Button>
          </motion.div>
        )}
        
        {/* Experience Timeline */}
        <div className="relative max-w-3xl mx-auto mt-8 pl-8 border-l-2 border-accent/30">
          {sortedExperience.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="mb-10 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Timeline dot */}
              <div className="absolute -left-[2.15rem] bg-background border-2 border-accent rounded-full p-1">
                <Briefcase className="h-5 w-5 text-accent" />
              </div>
              
              {/* Content */}
              <div className="glass-card rounded-lg p-6 ml-4 hover-glow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{exp.position}</h3>
                    <div className="flex items-center mb-2 text-sm text-accent">
                      <Building className="h-4 w-4 mr-2" />
                      <span>{exp.company}</span>
                    </div>
                    <div className="mb-3 text-sm text-muted-foreground">
                      {formatDate(exp.startDate)} - {exp.endDate === "Present" ? "Present" : formatDate(exp.endDate)}
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {exp.description}
                    </p>
                    
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {isAdmin && onUpdateExperience && onDeleteExperience && (
                    <EditControls 
                      onEdit={() => handleEditExperience(exp)} 
                      onDelete={() => handleDeleteExperience(exp)} 
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Experience form dialog (admin view) */}
        <Dialog open={isFormOpen} onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) resetForm();
        }}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {experienceToEdit ? "Edit Experience" : "Add New Experience"}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSaveExperience} className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Enter company name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="Enter job title"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="endDate"
                        type="date"
                        value={endDate === "Present" ? "" : endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        disabled={endDate === "Present"}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant={endDate === "Present" ? "default" : "outline"}
                        className="whitespace-nowrap"
                        onClick={() => {
                          setEndDate(endDate === "Present" ? "" : "Present");
                        }}
                      >
                        {endDate === "Present" ? "Current Job" : "Set as Current"}
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your responsibilities and achievements"
                    rows={3}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="technologies">Technologies (optional)</Label>
                  <div className="flex">
                    <Input
                      id="technologies"
                      value={currentTech}
                      onChange={(e) => setCurrentTech(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Add a technology or tool"
                      className="mr-2"
                    />
                    <Button type="button" onClick={handleAddTechnology}>
                      Add
                    </Button>
                  </div>
                  
                  {technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {technologies.map((tech, index) => (
                        <div 
                          key={index}
                          className="bg-secondary flex items-center rounded-md px-2 py-1 text-sm"
                        >
                          {tech}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 ml-1 text-muted-foreground hover:text-white"
                            onClick={() => handleRemoveTechnology(tech)}
                          >
                            <X size={12} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsFormOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Experience</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        
        {/* Delete confirmation dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the experience entry
                <strong className="font-semibold">
                  {experienceToDelete ? ` "${experienceToDelete.position} at ${experienceToDelete.company}"` : ""}
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

export default ExperienceSection;
