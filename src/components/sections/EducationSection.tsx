
import { useState } from "react";
import { motion } from "framer-motion";
import { Education } from "@/services/storageService";
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
import { Edit, GraduationCap, Plus, School, Trash } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import EditControls from "@/components/EditControls";

interface EducationSectionProps {
  education: Education[];
  isAdmin?: boolean;
  onAddEducation?: (education: Omit<Education, "id">) => void;
  onUpdateEducation?: (education: Education) => void;
  onDeleteEducation?: (id: string) => void;
}

const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  isAdmin = false,
  onAddEducation,
  onUpdateEducation,
  onDeleteEducation,
}) => {
  const [educationToEdit, setEducationToEdit] = useState<Education | null>(null);
  const [educationToDelete, setEducationToDelete] = useState<Education | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [institution, setInstitution] = useState("");
  const [degree, setDegree] = useState("");
  const [field, setField] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM yyyy");
    } catch (error) {
      return dateString;
    }
  };

  // Handle edit education
  const handleEditEducation = (education: Education) => {
    setEducationToEdit(education);
    setInstitution(education.institution);
    setDegree(education.degree);
    setField(education.field);
    setStartDate(education.startDate);
    setEndDate(education.endDate);
    setDescription(education.description);
    setIsFormOpen(true);
  };

  // Handle delete education
  const handleDeleteEducation = (education: Education) => {
    setEducationToDelete(education);
    setIsDeleteDialogOpen(true);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (educationToDelete && onDeleteEducation) {
      onDeleteEducation(educationToDelete.id);
      toast({
        title: "Education entry deleted",
        description: `"${educationToDelete.degree} at ${educationToDelete.institution}" has been deleted successfully.`,
      });
    }
    setIsDeleteDialogOpen(false);
    setEducationToDelete(null);
  };

  // Handle save education
  const handleSaveEducation = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedEducation = {
      ...(educationToEdit && { id: educationToEdit.id }),
      institution,
      degree,
      field,
      startDate,
      endDate,
      description,
    };
    
    if (educationToEdit && onUpdateEducation) {
      onUpdateEducation(updatedEducation as Education);
      toast({
        title: "Education entry updated",
        description: `"${degree} at ${institution}" has been updated successfully.`,
      });
    } else if (onAddEducation) {
      onAddEducation(updatedEducation);
      toast({
        title: "Education entry added",
        description: `"${degree} at ${institution}" has been added successfully.`,
      });
    }
    
    setIsFormOpen(false);
    resetForm();
  };

  // Handle add new education
  const handleAddEducation = () => {
    resetForm();
    setIsFormOpen(true);
  };

  // Reset form
  const resetForm = () => {
    setEducationToEdit(null);
    setInstitution("");
    setDegree("");
    setField("");
    setStartDate("");
    setEndDate("");
    setDescription("");
  };

  // Sort education by end date (newest first)
  const sortedEducation = [...education].sort((a, b) => {
    return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
  });

  return (
    <section id="education" className="py-16">
      <div className="container mx-auto">
        <SectionHeading 
          title="Education" 
          subtitle="My academic journey and qualifications."
        />
        
        {isAdmin && onAddEducation && (
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button onClick={handleAddEducation}>
              <Plus className="mr-2 h-4 w-4" />
              Add Education
            </Button>
          </motion.div>
        )}
        
        {/* Education Timeline */}
        <div className="relative max-w-3xl mx-auto mt-8 pl-8 border-l-2 border-accent/30">
          {sortedEducation.map((edu, index) => (
            <motion.div
              key={edu.id}
              className="mb-10 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Timeline dot */}
              <div className="absolute -left-[2.15rem] bg-background border-2 border-accent rounded-full p-1">
                <GraduationCap className="h-5 w-5 text-accent" />
              </div>
              
              {/* Content */}
              <div className="glass-card rounded-lg p-6 ml-4 hover-glow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{edu.degree}</h3>
                    <h4 className="text-lg text-accent mb-1">{edu.field}</h4>
                    <div className="flex items-center mb-2 text-sm text-muted-foreground">
                      <School className="h-4 w-4 mr-2" />
                      <a
                        href={`https://www.google.com/maps?q=${encodeURIComponent(edu.institution + ' Bangalore')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-accent"
                        aria-label={`Open ${edu.institution} location in Google Maps`}
                      >
                        {edu.institution}
                      </a>
                    </div>
                    <div className="mb-3 text-sm text-muted-foreground">
                      {formatDate(edu.startDate)} - {edu.endDate === "Present" ? "Present" : formatDate(edu.endDate)}
                    </div>
                    <p className="text-muted-foreground">
                      {edu.description}
                    </p>
                  </div>
                  
                  {isAdmin && onUpdateEducation && onDeleteEducation && (
                    <EditControls 
                      onEdit={() => handleEditEducation(edu)} 
                      onDelete={() => handleDeleteEducation(edu)} 
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Education form dialog (admin view) */}
        <Dialog open={isFormOpen} onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) resetForm();
        }}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {educationToEdit ? "Edit Education" : "Add New Education"}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSaveEducation} className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution</Label>
                  <Input
                    id="institution"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="Enter university or school name"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="degree">Degree</Label>
                    <Input
                      id="degree"
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      placeholder="E.g., Bachelor's, Master's, etc."
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="field">Field of Study</Label>
                    <Input
                      id="field"
                      value={field}
                      onChange={(e) => setField(e.target.value)}
                      placeholder="E.g., Computer Science"
                      required
                    />
                  </div>
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
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your studies, achievements, etc."
                    rows={3}
                  />
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
                <Button type="submit">Save Education</Button>
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
                This will permanently delete the education entry
                <strong className="font-semibold">
                  {educationToDelete ? ` "${educationToDelete.degree} at ${educationToDelete.institution}"` : ""}
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

export default EducationSection;
