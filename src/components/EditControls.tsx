
import { motion } from "framer-motion";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EditControlsProps {
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
}

const EditControls: React.FC<EditControlsProps> = ({
  onEdit,
  onDelete,
  className = "",
}) => {
  return (
    <motion.div
      className={`flex gap-2 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        size="icon"
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        className="text-primary hover:text-accent transition-colors"
      >
        <Edit size={18} />
        <span className="sr-only">Edit</span>
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="text-primary hover:text-destructive transition-colors"
      >
        <Trash size={18} />
        <span className="sr-only">Delete</span>
      </Button>
    </motion.div>
  );
};

export default EditControls;
