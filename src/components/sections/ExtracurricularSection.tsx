import { useState } from "react";
import { motion } from "framer-motion";
import { Extracurricular } from "@/services/storageService";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Users, Edit, Trash, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import EditControls from "@/components/EditControls";

interface ExtracurricularSectionProps {
  extracurriculars: Extracurricular[];
  isAdmin?: boolean;
  onAddExtracurricular?: (extracurricular: Omit<Extracurricular, "id">) => void;
  onUpdateExtracurricular?: (extracurricular: Extracurricular) => void;
  onDeleteExtracurricular?: (id: string) => void;
}

const ExtracurricularSection: React.FC<ExtracurricularSectionProps> = ({
  extracurriculars,
  isAdmin = false,
  onAddExtracurricular,
  onUpdateExtracurricular,
  onDeleteExtracurricular,
}) => {
  const [itemToEdit, setItemToEdit] = useState<Extracurricular | null>(null);
  const [itemToDelete, setItemToDelete] = useState<Extracurricular | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const handleEdit = (item: Extracurricular) => {
    setItemToEdit(item);
    setTitle(item.title);
    setRole(item.role || "");
    setDate(item.date || "");
    setDescription(item.description);
    setIsFormOpen(true);
  };

  const handleDelete = (item: Extracurricular) => {
    setItemToDelete(item);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete && onDeleteExtracurricular) {
      onDeleteExtracurricular(itemToDelete.id);
      toast({
        title: "Extracurricular deleted",
        description: `"${itemToDelete.title}" removed successfully.`,
      });
    }
    setIsDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...(itemToEdit && { id: itemToEdit.id }),
      title,
      role,
      date,
      description,
    };

    if (itemToEdit && onUpdateExtracurricular) {
      onUpdateExtracurricular(updated as Extracurricular);
      toast({ title: "Updated", description: `"${title}" updated successfully.` });
    } else if (onAddExtracurricular) {
      onAddExtracurricular(updated);
      toast({ title: "Added", description: `"${title}" added successfully.` });
    }

    setIsFormOpen(false);
    resetForm();
  };

  const handleAdd = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setItemToEdit(null);
    setTitle("");
    setRole("");
    setDate("");
    setDescription("");
  };

  return (
    <section id="extracurricular" className="py-16">
      <div className="container mx-auto">
        <SectionHeading 
          title="Extracurricular Activities" 
          subtitle="Community service, leadership, and volunteering."
        />

        {isAdmin && onAddExtracurricular && (
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button onClick={handleAdd}>
              <Plus className="mr-2 h-4 w-4" />
              Add Activity
            </Button>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {extracurriculars.map((item, index) => (
            <motion.div
              key={item.id}
              className="glass-card rounded-lg p-6 hover-glow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold flex items-center">
                    <Users className="h-5 w-5 text-accent mr-2" />
                    {item.title}
                  </h3>
                  {item.role && <p className="text-accent text-sm">{item.role}</p>}
                  {item.date && <p className="text-muted-foreground text-sm">{item.date}</p>}
                  <p className="mt-2">{item.description}</p>
                </div>

                {isAdmin && (
                  <EditControls 
                    onEdit={() => handleEdit(item)} 
                    onDelete={() => handleDelete(item)} 
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Form Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{itemToEdit ? "Edit Activity" : "Add Activity"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input value={role} onChange={(e) => setRole(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
              </div>
              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete confirmation */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete 
                <strong className="font-semibold"> "{itemToDelete?.title}"</strong>.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
};

export default ExtracurricularSection;
