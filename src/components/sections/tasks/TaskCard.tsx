
import { motion } from "framer-motion";
import { Task } from "@/services/storageService";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { CalendarClock, AlertCircle, CheckCircle2 } from "lucide-react";
import EditControls from "@/components/EditControls";

interface TaskCardProps {
  task: Task;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleComplete?: (id: string, completed: boolean) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isAdmin = false,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const priorityColors = {
    low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    high: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  const priorityIcons = {
    low: <div className="w-1 h-1 rounded-full bg-blue-400 mr-1"></div>,
    medium: <div className="w-1 h-1 rounded-full bg-yellow-400 mr-1"></div>,
    high: <div className="w-1 h-1 rounded-full bg-red-400 mr-1"></div>,
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    if (onToggleComplete) {
      onToggleComplete(task.id, checked);
    }
  };

  return (
    <motion.div
      className={`glass-card rounded-xl p-5 hover-glow transition-all duration-300 border-l-4 ${task.completed ? "border-l-green-500/50 opacity-60" : `border-l-${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'blue'}-500/50`}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-start gap-3">
          {isAdmin && onToggleComplete && (
            <div className="mt-1">
              <Checkbox
                checked={task.completed}
                onCheckedChange={handleCheckboxChange}
                className="data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground"
              />
            </div>
          )}
          
          <div>
            <h3 className={`text-lg font-semibold ${task.completed ? "line-through opacity-70 text-muted-foreground" : "text-gradient"}`}>
              {task.title}
            </h3>
            
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge 
                variant="outline" 
                className={`text-xs ${priorityColors[task.priority]} px-2 py-0.5 flex items-center`}
              >
                {priorityIcons[task.priority]}
                {task.priority} priority
              </Badge>
              
              {task.dueDate && (
                <span className={`text-xs text-muted-foreground flex items-center gap-1 ${task.completed ? "line-through" : ""}`}>
                  <CalendarClock size={12} className="opacity-70" />
                  Due: {formatDate(task.dueDate)}
                </span>
              )}
              
              {task.completed && (
                <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs px-2 py-0.5 flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  Completed
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        {isAdmin && onEdit && onDelete && (
          <EditControls onEdit={onEdit} onDelete={onDelete} />
        )}
      </div>
      
      <motion.p 
        className={`text-muted-foreground text-sm mt-3 ml-11 ${task.completed ? "line-through opacity-70" : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        {task.description}
      </motion.p>
    </motion.div>
  );
};

export default TaskCard;
