
import { motion } from "framer-motion";
import { Feedback } from "@/services/storageService";
import { format } from "date-fns";
import { Star, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeedbackCardProps {
  feedback: Feedback;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  feedback,
  isAdmin = false,
  onDelete,
}) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <motion.div
      className="glass-card rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              className={i < feedback.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"} 
            />
          ))}
        </div>
        
        {isAdmin && onDelete && (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onDelete(feedback.id)}
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
          >
            <Trash size={16} />
          </Button>
        )}
      </div>
      
      <blockquote className="text-sm sm:text-base italic mb-4">
        "{feedback.comment}"
      </blockquote>
      
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <span className="font-medium">{feedback.name}</span>
        <span>{formatDate(feedback.date)}</span>
      </div>
    </motion.div>
  );
};

export default FeedbackCard;
