
import { useState } from "react";
import { motion } from "framer-motion";
import { Feedback } from "@/services/storageService";
import SectionHeading from "@/components/SectionHeading";
import FeedbackCard from "./FeedbackCard";
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
import { useToast } from "@/components/ui/use-toast";

interface FeedbackSectionProps {
  feedback: Feedback[];
  isAdmin?: boolean;
  onDeleteFeedback?: (id: string) => void;
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  feedback,
  isAdmin = false,
  onDeleteFeedback,
}) => {
  const [feedbackToDelete, setFeedbackToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  // Calculate average rating
  const averageRating = feedback.length > 0 
    ? feedback.reduce((sum, item) => sum + item.rating, 0) / feedback.length 
    : 0;

  // Format average rating
  const formattedAverage = averageRating.toFixed(1);

  // Handle delete feedback
  const handleDeleteFeedback = (id: string) => {
    setFeedbackToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (feedbackToDelete && onDeleteFeedback) {
      onDeleteFeedback(feedbackToDelete);
      toast({
        title: "Feedback deleted",
        description: "The feedback has been deleted successfully.",
      });
    }
    setIsDeleteDialogOpen(false);
    setFeedbackToDelete(null);
  };

  // Sort feedback by date (newest first)
  const sortedFeedback = [...feedback].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <section id="feedback" className="py-16 bg-black">
      <div className="container mx-auto">
        <SectionHeading 
          title="Feedback" 
          subtitle={`What people are saying ${feedback.length > 0 ? `(${formattedAverage}/5 average rating)` : ''}`}
        />
        
        {feedback.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {sortedFeedback.map((item) => (
              <FeedbackCard
                key={item.id}
                feedback={item}
                isAdmin={isAdmin}
                onDelete={isAdmin ? handleDeleteFeedback : undefined}
              />
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-12 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No feedback available yet. Be the first to leave a comment!
          </motion.div>
        )}
        
        {/* Delete confirmation dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this feedback. 
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

export default FeedbackSection;
