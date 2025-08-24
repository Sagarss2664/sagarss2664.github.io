
import { useState } from "react";
import { motion } from "framer-motion";
import { Skill } from "@/services/storageService";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Edit, Plus, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "@/contexts/ThemeContext";

interface SkillsSectionProps {
  skills: Skill[];
  isAdmin?: boolean;
  onAddSkill?: (skill: Omit<Skill, "id">) => void;
  onUpdateSkill?: (skill: Skill) => void;
  onDeleteSkill?: (id: string) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  isAdmin = false,
  onAddSkill,
  onUpdateSkill,
  onDeleteSkill,
}) => {
  const [skillToEdit, setSkillToEdit] = useState<Skill | null>(null);
  const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState(3);
  const { toast } = useToast();
  const { theme } = useTheme();

  // const getIconUrl = (skillName: string) => {
  //   const name = skillName.toLowerCase();
  //   if (name.includes("ui") || name.includes("ux")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg";
  //   if (name.includes("aws")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg";
  //   if (name.includes("node")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg";
  //   if (name.includes("html")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg";
  //   if (name.includes("css")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg";
  //   return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`;
  // };
  const getIconUrl = (skillName: string) => {
  const name = skillName.toLowerCase();

  // Special cases for tools & clouds
  if (name.includes("ui") || name.includes("ux")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg";
  if (name.includes("aws")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg";
  if (name.includes("gcp")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg";
  if (name.includes("docker")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg";
  if (name.includes("ansible")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg";
  if (name.includes("node")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg";
  if (name.includes("express")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg";
  if (name.includes("html")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg";
  if (name.includes("css")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg";
  if (name.includes("react")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg";
  if (name.includes("tailwind")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg";
  if (name.includes("typescript")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg";
  if (name.includes("javascript")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
  if (name.includes("python")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg";
  if (name.includes("c++")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg";
  if (name === "c") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg";
  if (name.includes("java")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg";
  if (name.includes("mysql")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg";
  if (name.includes("mongodb")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg";
  if (name.includes("git")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg";
  if (name.includes("github")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg";

  // fallback
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`;
};


  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: {
      scale: 1.08,
      boxShadow: "0 0 25px rgba(255, 255, 255, 0.5)",
      borderColor: "rgba(255, 255, 255, 0.5)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Handle admin actions
  const handleEditSkill = (skill: Skill) => {
    setSkillToEdit(skill);
    setName(skill.name);
    setCategory(skill.category);
    setLevel(skill.level);
    setIsFormOpen(true);
  };

  const handleDeleteSkill = (skill: Skill) => {
    setSkillToDelete(skill);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (skillToDelete && onDeleteSkill) {
      onDeleteSkill(skillToDelete.id);
      toast({ title: "Skill deleted", description: `"${skillToDelete.name}" has been deleted successfully.` });
    }
    setIsDeleteDialogOpen(false);
    setSkillToDelete(null);
  };

  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSkill = {
      ...(skillToEdit && { id: skillToEdit.id }),
      name,
      category,
      level,
    };
    if (skillToEdit && onUpdateSkill) {
      onUpdateSkill(updatedSkill as Skill);
      toast({ title: "Skill updated", description: `"${name}" has been updated successfully.` });
    } else if (onAddSkill) {
      onAddSkill(updatedSkill);
      toast({ title: "Skill added", description: `"${name}" has been added successfully.` });
    }
    setIsFormOpen(false);
    resetForm();
  };

  const handleAddSkill = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setSkillToEdit(null);
    setName("");
    setCategory("");
    setLevel(3);
  };

  return (
    <section id="skills" className="py-16">
      <div className="container mx-auto">
        <SectionHeading title="Tools I Use" subtitle="My technical expertise" />

        {isAdmin && onAddSkill && (
          <motion.div 
            className="flex justify-center mb-8" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <Button onClick={handleAddSkill}>
              <Plus className="mr-2 h-4 w-4" /> Add Tool
            </Button>
          </motion.div>
        )}

        <motion.div 
          className="flex flex-wrap gap-4 justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.id}
              variants={skillVariants}
              whileHover="hover"
              className="group flex items-center gap-2 rounded-full px-4 py-2 border backdrop-blur text-white text-sm font-medium overflow-hidden relative"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(20,20,20,0.9)',
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.15)'
              }}
            >
              <img src={getIconUrl(skill.name)} alt={skill.name} className="w-6 h-6 object-contain" />
              {skill.name}
              
              {/* Shine effect overlay */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 0.5,
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
          
          {/* More... pill */}
          <motion.div
            variants={skillVariants}
            whileHover="hover"
            className="group flex items-center gap-2 rounded-full px-4 py-2 border backdrop-blur text-white text-sm font-medium overflow-hidden relative cursor-pointer"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(20,20,20,0.9)',
              borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.15)'
            }}
          >
            more...
            
            {/* Shine effect overlay */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 0.5,
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Dialog forms for admin actions */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{skillToEdit ? "Edit Skill" : "Add Skill"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveSkill}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="level" className="text-right">
                  Level
                </Label>
                <Slider
                  id="level"
                  defaultValue={[level]}
                  max={5}
                  step={1}
                  onValueChange={(value) => setLevel(value[0])}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                {skillToEdit ? "Update Skill" : "Add Skill"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Are you sure you want to delete <span className="font-medium">"{skillToDelete?.name}"</span>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default SkillsSection;
