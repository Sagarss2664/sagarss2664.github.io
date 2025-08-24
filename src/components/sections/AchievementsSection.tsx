import { useState } from "react";
import { motion } from "framer-motion";
import { Achievement } from "@/services/storageService";
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
import { Trophy, Edit, Trash, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import EditControls from "@/components/EditControls";

interface AchievementsSectionProps {
  achievements: Achievement[];
  isAdmin?: boolean;
  onAddAchievement?: (achievement: Omit<Achievement, "id">) => void;
  onUpdateAchievement?: (achievement: Achievement) => void;
  onDeleteAchievement?: (id: string) => void;
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  achievements,
  isAdmin = false,
  onAddAchievement,
  onUpdateAchievement,
  onDeleteAchievement,
}) => {
  const [achievementToEdit, setAchievementToEdit] = useState<Achievement | null>(null);
  const [achievementToDelete, setAchievementToDelete] = useState<Achievement | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const handleEditAchievement = (achievement: Achievement) => {
    setAchievementToEdit(achievement);
    setTitle(achievement.title);
    setIssuer(achievement.issuer || "");
    setDate(achievement.date);
    setDescription(achievement.description);
    setUrl(achievement.url || "");
    setIsFormOpen(true);
  };

  const handleDeleteAchievement = (achievement: Achievement) => {
    setAchievementToDelete(achievement);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (achievementToDelete && onDeleteAchievement) {
      onDeleteAchievement(achievementToDelete.id);
      toast({
        title: "Achievement deleted",
        description: `"${achievementToDelete.title}" removed successfully.`,
      });
    }
    setIsDeleteDialogOpen(false);
    setAchievementToDelete(null);
  };

  const handleSaveAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedAchievement = {
      ...(achievementToEdit && { id: achievementToEdit.id }),
      title,
      issuer,
      date,
      description,
      url,
    };

    if (achievementToEdit && onUpdateAchievement) {
      onUpdateAchievement(updatedAchievement as Achievement);
      toast({ title: "Achievement updated", description: `"${title}" updated successfully.` });
    } else if (onAddAchievement) {
      onAddAchievement(updatedAchievement);
      toast({ title: "Achievement added", description: `"${title}" added successfully.` });
    }

    setIsFormOpen(false);
    resetForm();
  };

  const handleAddAchievement = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setAchievementToEdit(null);
    setTitle("");
    setIssuer("");
    setDate("");
    setDescription("");
    setUrl("");
  };

  return (
    <section id="achievements" className="py-16">
      <div className="container mx-auto">
        <SectionHeading 
          title="Achievements" 
          subtitle="Awards and recognitions I’ve received."
        />

        {isAdmin && onAddAchievement && (
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button onClick={handleAddAchievement}>
              <Plus className="mr-2 h-4 w-4" />
              Add Achievement
            </Button>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {achievements.map((ach, index) => (
            <motion.div
              key={ach.id}
              className="glass-card rounded-lg p-6 hover-glow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold flex items-center">
                    <Trophy className="h-5 w-5 text-accent mr-2" />
                    {ach.title}
                  </h3>
                  {ach.issuer && <p className="text-accent text-sm">{ach.issuer}</p>}
                  <p className="text-muted-foreground text-sm">{ach.date}</p>
                  <p className="mt-2">{ach.description}</p>
                  {ach.url && (
                    <a href={ach.url} target="_blank" className="text-accent underline text-sm">
                      View More
                    </a>
                  )}
                </div>

                {isAdmin && (
                  <EditControls 
                    onEdit={() => handleEditAchievement(ach)} 
                    onDelete={() => handleDeleteAchievement(ach)} 
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
              <DialogTitle>{achievementToEdit ? "Edit Achievement" : "Add Achievement"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSaveAchievement} className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Issuer</Label>
                <Input value={issuer} onChange={(e) => setIssuer(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="text" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
              </div>
              <div className="space-y-2">
                <Label>URL</Label>
                <Input value={url} onChange={(e) => setUrl(e.target.value)} />
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
                <strong className="font-semibold"> "{achievementToDelete?.title}"</strong>.
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

export default AchievementsSection;
