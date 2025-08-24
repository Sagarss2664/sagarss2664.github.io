
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
// import ParticlesBackground from "@/components/ParticlesBackground";
import Hero from "@/components/sections/Hero";
import ProjectsSection from "@/components/sections/projects/ProjectsSection";
import CertificatesSection from "@/components/sections/certificates/CertificatesSection";
import TasksSection from "@/components/sections/tasks/TasksSection";
import SkillsSection from "@/components/sections/SkillsSection";
import EducationSection from "@/components/sections/EducationSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";
import FeedbackSection from "@/components/sections/feedback/FeedbackSection";
import Footer from "@/components/Footer";
import TabSwitcher from "@/components/TabSwitcher";
import ProfileForm from "@/components/ProfileForm";
import SocialLinksManager from "@/components/SocialLinksManager";
import { Button } from "@/components/ui/button";
import { LogOut, Loader2 } from "lucide-react";
import {
  fetchProfile,
  fetchSocialLinks,
  fetchProjects,
  fetchCertificates,
  fetchTasks,
  fetchSkills,
  fetchEducation,
  fetchExperience,
  fetchContact,
  fetchFeedback,
} from "@/services/dataClient";
import {
  updateProfile,
  addSocialLink,
  updateSocialLink,
  deleteSocialLink,
  addProject,
  updateProject,
  deleteProject,
  addCertificate,
  updateCertificate,
  deleteCertificate,
  addTask,
  updateTask,
  deleteTask,
  addSkill,
  updateSkill,
  deleteSkill,
  addEducation,
  updateEducation,
  deleteEducation,
  addExperience,
  updateExperience,
  deleteExperience,
  updateContact,
  deleteFeedback,
  getFeedback,
} from "@/services/storageService";
import { useToast } from "@/components/ui/use-toast";

const AdminPanel = () => {
  // Auth
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // State for all data
  const [profile, setProfile] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [contact, setContact] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Load data from Supabase on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          profileData,
          socialLinksData,
          projectsData,
          certificatesData,
          tasksData,
          skillsData,
          educationData,
          experienceData,
          contactData,
          feedbackData,
        ] = await Promise.all([
          fetchProfile(),
          fetchSocialLinks(),
          fetchProjects(),
          fetchCertificates(),
          fetchTasks(),
          fetchSkills(),
          fetchEducation(),
          fetchExperience(),
          fetchContact(),
          fetchFeedback(),
        ]);

        setProfile(profileData);
        setSocialLinks(socialLinksData);
        setProjects(projectsData);
        setCertificates(certificatesData);
        setTasks(tasksData);
        setSkills(skillsData);
        setEducation(educationData);
        setExperience(experienceData);
        setContact(contactData);
        setFeedback(feedbackData);
      } catch (error) {
        console.error('Error loading admin data:', error);
        toast({
          title: "Error loading data",
          description: "Failed to load portfolio data",
          variant: "destructive",
        });
      } finally {
        setDataLoading(false);
      }
    };

    loadData();
  }, [toast]);

  // State for edit forms
  const [isProfileFormOpen, setIsProfileFormOpen] = useState(false);
  const [isSocialLinksManagerOpen, setIsSocialLinksManagerOpen] = useState(false);

  // Tab state for the content switcher
  const [activeTab, setActiveTab] = useState("projects");
  const tabs = [
    { id: "projects", label: "Projects" },
    { id: "certificates", label: "Certificates" },
    { id: "tasks", label: "Tasks" },
  ];

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Handle profile form
  const handleEditProfile = () => {
    setIsProfileFormOpen(true);
  };

  const handleSaveProfile = async (updatedProfile) => {
    try {
      await updateProfile(updatedProfile);
      setProfile(updatedProfile);
      setIsProfileFormOpen(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  // Handle social links
  const handleEditSocialLinks = () => {
    setIsSocialLinksManagerOpen(true);
  };

  const handleAddSocialLink = async (socialLink) => {
    try {
      const newSocialLink = await addSocialLink(socialLink);
      setSocialLinks([...socialLinks, newSocialLink]);
      toast({
        title: "Social link added",
        description: "Social link has been added successfully.",
      });
    } catch (error) {
      console.error('Error adding social link:', error);
      toast({
        title: "Error",
        description: "Failed to add social link",
        variant: "destructive",
      });
    }
  };

  const handleUpdateSocialLink = async (socialLink) => {
    try {
      await updateSocialLink(socialLink);
      setSocialLinks(
        socialLinks.map((link) => (link.id === socialLink.id ? socialLink : link))
      );
      toast({
        title: "Social link updated",
        description: "Social link has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating social link:', error);
      toast({
        title: "Error",
        description: "Failed to update social link",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSocialLink = async (id) => {
    try {
      await deleteSocialLink(id);
      setSocialLinks(socialLinks.filter((link) => link.id !== id));
      toast({
        title: "Social link deleted",
        description: "Social link has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting social link:', error);
      toast({
        title: "Error",
        description: "Failed to delete social link",
        variant: "destructive",
      });
    }
  };

  // Handle projects
  const handleAddProject = (project) => {
    const newProject = addProject(project);
    setProjects([...projects, newProject]);
  };

  const handleUpdateProject = (project) => {
    updateProject(project);
    setProjects(
      projects.map((p) => (p.id === project.id ? project : p))
    );
  };

  const handleDeleteProject = (id) => {
    deleteProject(id);
    setProjects(projects.filter((project) => project.id !== id));
  };

  // Handle certificates
  const handleAddCertificate = (certificate) => {
    const newCertificate = addCertificate(certificate);
    setCertificates([...certificates, newCertificate]);
  };

  const handleUpdateCertificate = (certificate) => {
    updateCertificate(certificate);
    setCertificates(
      certificates.map((c) => (c.id === certificate.id ? certificate : c))
    );
  };

  const handleDeleteCertificate = (id) => {
    deleteCertificate(id);
    setCertificates(certificates.filter((certificate) => certificate.id !== id));
  };

  // Handle tasks
  const handleAddTask = (task) => {
    const newTask = addTask(task);
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = (task) => {
    updateTask(task);
    setTasks(
      tasks.map((t) => (t.id === task.id ? task : t))
    );
  };

  const handleDeleteTask = (id) => {
    deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Handle skills
  const handleAddSkill = (skill) => {
    const newSkill = addSkill(skill);
    setSkills([...skills, newSkill]);
  };

  const handleUpdateSkill = (skill) => {
    updateSkill(skill);
    setSkills(
      skills.map((s) => (s.id === skill.id ? skill : s))
    );
  };

  const handleDeleteSkill = (id) => {
    deleteSkill(id);
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  // Handle education
  const handleAddEducation = (educationEntry) => {
    const newEducation = addEducation(educationEntry);
    setEducation([...education, newEducation]);
  };

  const handleUpdateEducation = (educationEntry) => {
    updateEducation(educationEntry);
    setEducation(
      education.map((e) => (e.id === educationEntry.id ? educationEntry : e))
    );
  };

  const handleDeleteEducation = (id) => {
    deleteEducation(id);
    setEducation(education.filter((educationEntry) => educationEntry.id !== id));
  };

  // Handle experience
  const handleAddExperience = (experienceEntry) => {
    const newExperience = addExperience(experienceEntry);
    setExperience([...experience, newExperience]);
  };

  const handleUpdateExperience = (experienceEntry) => {
    updateExperience(experienceEntry);
    setExperience(
      experience.map((e) => (e.id === experienceEntry.id ? experienceEntry : e))
    );
  };

  const handleDeleteExperience = (id) => {
    deleteExperience(id);
    setExperience(experience.filter((experienceEntry) => experienceEntry.id !== id));
  };

  // Handle contact
  const handleUpdateContact = (contactInfo) => {
    updateContact(contactInfo);
    setContact(contactInfo);
  };

  // Handle feedback
  const handleDeleteFeedback = (id) => {
    deleteFeedback(id);
    setFeedback(feedback.filter((f) => f.id !== id));
  };

  // Handle logout
  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
     
      
      {/* Admin Logout Button */}
      <motion.div
        className="fixed top-4 right-4 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Button 
          onClick={handleLogout} 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <LogOut size={16} />
          Logout
        </Button>
      </motion.div>
      
      {/* Admin Page Title */}
      <motion.div
        className="py-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <p className="text-muted-foreground">Edit your portfolio content here</p>
      </motion.div>
      
      {/* Hero Section */}
      <Hero 
        profile={profile} 
        socialLinks={socialLinks} 
        isAdmin={true}
        onEditProfile={handleEditProfile}
        onEditSocial={handleEditSocialLinks}
      />
      
      {/* Content Tabs Section */}
      <section id="content-tabs" className="py-16">
        <div className="container mx-auto">
          <TabSwitcher
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
          
          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "projects" && (
              <ProjectsSection 
                projects={projects} 
                isAdmin={true}
                onAddProject={handleAddProject}
                onUpdateProject={handleUpdateProject}
                onDeleteProject={handleDeleteProject}
              />
            )}
            {activeTab === "certificates" && (
              <CertificatesSection 
                certificates={certificates} 
                isAdmin={true}
                onAddCertificate={handleAddCertificate}
                onUpdateCertificate={handleUpdateCertificate}
                onDeleteCertificate={handleDeleteCertificate}
              />
            )}
            {activeTab === "tasks" && (
              <TasksSection 
                tasks={tasks} 
                isAdmin={true}
                onAddTask={handleAddTask}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
              />
            )}
          </motion.div>
        </div>
      </section>
      
      {/* Skills Section */}
      <SkillsSection 
        skills={skills} 
        isAdmin={true}
        onAddSkill={handleAddSkill}
        onUpdateSkill={handleUpdateSkill}
        onDeleteSkill={handleDeleteSkill}
      />
      
      {/* Education Section */}
      <EducationSection 
        education={education} 
        isAdmin={true}
        onAddEducation={handleAddEducation}
        onUpdateEducation={handleUpdateEducation}
        onDeleteEducation={handleDeleteEducation}
      />
      
      {/* Experience Section */}
      <ExperienceSection 
        experience={experience} 
        isAdmin={true}
        onAddExperience={handleAddExperience}
        onUpdateExperience={handleUpdateExperience}
        onDeleteExperience={handleDeleteExperience}
      />
      
      {/* Contact Section */}
      <ContactSection 
        contact={contact} 
        isAdmin={true}
        onUpdateContact={handleUpdateContact}
      />
      
      {/* Feedback Section */}
      <FeedbackSection 
        feedback={feedback} 
        isAdmin={true}
        onDeleteFeedback={handleDeleteFeedback}
      />
      
      {/* Footer */}
      <Footer socialLinks={socialLinks} />
      
      {/* Profile edit form */}
      <ProfileForm
        profile={profile}
        isOpen={isProfileFormOpen}
        onClose={() => setIsProfileFormOpen(false)}
        onSave={handleSaveProfile}
      />
      
      {/* Social links manager */}
      <SocialLinksManager
        socialLinks={socialLinks}
        isOpen={isSocialLinksManagerOpen}
        onClose={() => setIsSocialLinksManagerOpen(false)}
        onAddSocialLink={handleAddSocialLink}
        onUpdateSocialLink={handleUpdateSocialLink}
        onDeleteSocialLink={handleDeleteSocialLink}
      />
    </div>
  );
};

export default AdminPanel;
