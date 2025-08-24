
import { useState } from "react";
import { motion } from "framer-motion";
import { Task } from "@/services/storageService";
import SectionHeading from "@/components/SectionHeading";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
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

interface TasksSectionProps {
  tasks: Task[];
  isAdmin?: boolean;
  onAddTask?: (task: Omit<Task, "id">) => void;
  onUpdateTask?: (task: Task) => void;
  onDeleteTask?: (id: string) => void;
}

const TasksSection: React.FC<TasksSectionProps> = ({
  tasks,
  isAdmin = false,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const { toast } = useToast();

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // Sort tasks by due date and priority
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // First sort by completion status
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then by priority
    const priorityWeight = { high: 0, medium: 1, low: 2 };
    if (a.priority !== b.priority) {
      return priorityWeight[a.priority] - priorityWeight[b.priority];
    }
    
    // Finally by due date
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    
    // Put tasks with due dates first
    if (a.dueDate) return -1;
    if (b.dueDate) return 1;
    
    return 0;
  });

  // Handle edit task
  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsFormOpen(true);
  };

  // Handle delete task
  const handleDeleteTask = (task: Task) => {
    setTaskToDelete(task);
    setIsDeleteDialogOpen(true);
  };

  // Handle toggle task completion
  const handleToggleComplete = (id: string, completed: boolean) => {
    const task = tasks.find(t => t.id === id);
    if (task && onUpdateTask) {
      onUpdateTask({ ...task, completed });
    }
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (taskToDelete && onDeleteTask) {
      onDeleteTask(taskToDelete.id);
      toast({
        title: "Task deleted",
        description: `"${taskToDelete.title}" has been deleted successfully.`,
      });
    }
    setIsDeleteDialogOpen(false);
    setTaskToDelete(null);
  };

  // Handle save task
  const handleSaveTask = (task: Omit<Task, "id"> | Task) => {
    if ("id" in task && onUpdateTask) {
      onUpdateTask(task);
      toast({
        title: "Task updated",
        description: `"${task.title}" has been updated successfully.`,
      });
    } else if (onAddTask) {
      onAddTask(task);
      toast({
        title: "Task added",
        description: `"${task.title}" has been added successfully.`,
      });
    }
    setIsFormOpen(false);
    setTaskToEdit(null);
  };

  // Handle add new task
  const handleAddTask = () => {
    setTaskToEdit(null);
    setIsFormOpen(true);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  const tabVariants = {
    inactive: { 
      color: "rgba(255, 255, 255, 0.7)",
      backgroundColor: "transparent" 
    },
    active: { 
      color: "rgba(255, 255, 255, 1)",
      backgroundColor: "rgba(255, 255, 255, 0.1)"
    },
  };

  return (
    <section id="tasks" className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="Tasks & Goals" 
          subtitle="Current and upcoming activities on my roadmap."
        />
        
        <motion.div
          className="flex flex-col items-center gap-6 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center w-full max-w-2xl">
            <motion.div 
              className="flex justify-center w-full max-w-md mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="backdrop-blur-md bg-black/30 p-1 rounded-xl border border-white/10 flex w-full">
                {["all", "active", "completed"].map((tab) => (
                  <motion.button
                    key={tab}
                    onClick={() => setFilter(tab as "all" | "active" | "completed")}
                    className={`
                      relative flex-1 px-6 py-2.5 rounded-lg text-sm font-medium
                      transition-all capitalize flex items-center justify-center
                    `}
                    animate={filter === tab ? "active" : "inactive"}
                    variants={tabVariants}
                    whileHover={{ scale: filter === tab ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {filter === tab && (
                      <motion.span
                        className="absolute inset-0 bg-white/10 rounded-lg"
                        layoutId="taskTabBackground"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                          duration: 0.3
                        }}
                      />
                    )}
                    <span className="relative z-10">
                      {tab === "active" ? "In Progress" : tab}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
            
            {isAdmin && onAddTask && (
              <Button onClick={handleAddTask} size="sm" className="ml-4">
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            )}
          </div>
          
          {/* Tasks List */}
          <motion.div 
            className="w-full max-w-2xl space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {sortedTasks.length > 0 ? (
              sortedTasks.map((task) => (
                <motion.div key={task.id} variants={itemVariants}>
                  <TaskCard
                    task={task}
                    isAdmin={isAdmin}
                    onEdit={isAdmin ? () => handleEditTask(task) : undefined}
                    onDelete={isAdmin ? () => handleDeleteTask(task) : undefined}
                    onToggleComplete={isAdmin ? handleToggleComplete : undefined}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="text-center py-8 text-muted-foreground"
                variants={itemVariants}
              >
                {filter === "all" ? "No tasks available." : `No ${filter} tasks available.`}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
        
        {/* Task form dialog (admin view) */}
        <TaskForm
          task={taskToEdit}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveTask}
        />
        
        {/* Delete confirmation dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the task 
                <strong className="font-semibold">
                  {taskToDelete ? ` "${taskToDelete.title}"` : ""}
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

export default TasksSection;
