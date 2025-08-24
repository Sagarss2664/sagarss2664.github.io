import { supabase } from "@/integrations/supabase/client";

// Types
export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  url?: string;
  github?: string;
  pinned: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url?: string;
  image?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string;
  priority: "low" | "medium" | "high";
  progress?: number;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
  category: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies?: string[];
}

export interface Feedback {
  id: string;
  name: string;
  email?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ProfileInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  dateOfBirth?: string;
  languages?: string[];
  hobbies?: string[];
  profileImage: string;
}
export interface Achievement {
  id: string;
  title: string;
  issuer?: string;
  date: string;
  description: string;
  url?: string;
  image?: string;
}

export interface Extracurricular {
  id: string;
  title: string;
  role?: string;
  date?: string;
  description: string;
  image?: string;
}


export interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
  location?: string;
}

// Helper function to generate IDs
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Supabase helpers (fire-and-forget to keep current sync API)
const from = (table: string) => (supabase.from as any)(table);
const upsert = (table: string, row: any) => {
  (from(table).upsert(row) as any)
    .then(() => {
      console.log(`[Supabase] upsert into ${table} ok`);
    })
    .catch((e: any) => console.error(`[Supabase] upsert ${table} error`, e));
};

const removeById = (table: string, id: string) => {
  (from(table).delete().eq('id', id) as any)
    .then(() => {
      console.log(`[Supabase] delete from ${table} ok`);
    })
    .catch((e: any) => console.error(`[Supabase] delete ${table} error`, e));
};

// Static data (no localStorage dependency)

// const profile: ProfileInfo = {
//   name: "Sagar Subhas Shegunashi",
//   title: "Computer Science and Engineering Student",
//   bio: "Aspiring Data Scientist | Full-Stack Developer | Passionate about AI/ML, Web Development, and Cognitive Computing.",
//   email: "sagarshegunasi2664@gmail.com",
//   phone: "+91-8904646173",
//   location: "Hubli-580031, Karnataka, India",
//   dateOfBirth: "27 April 2004",
//   languages: ["English", "Hindi", "Kannada"],
//   hobbies: ["Anime", "Making Concepts", "Volunteering", "Gaming"],
//   profileImage: "public/lovable-uploads/Sagar.jpg",
// };

// const socialLinks: SocialLink[] = [
//   {
//     id: "social1",
//     platform: "LinkedIn",
//     url: "https://www.linkedin.com/in/sagar-shegunashi-aa857526a/",
//     icon: "Linkedin",
//   },
//   {
//     id: "social2",
//     platform: "GitHub",
//     url: "https://github.com/Sagarss2664",
//     icon: "Github",
//   },
//   {
//     id: "social3",
//     platform: "Gmail",
//     url: "mailto:sagarshegunasi2664@gmail.com",
//     icon: "Mail",
//   },
//   {
//     id: "social4",
//     platform: "LeetCode",
//     url: "https://leetcode.com/u/sagar_s_s/",
//     icon: "ExternalLink",
//   },
// ];


// const projects: Project[] = [
//   {
//     id: "project1",
//     title: "Grapho Genius – Handwriting-Based Thinking Style Recognition Tool",
//     description:
//       "CNN (VGGNet) model to classify thinking styles with 92.89% train and 79.01% test accuracy. Built React + Flask web app deployed on GCP; adopted by graphologists and hiring managers.",
//     image: "/projects/handwriting.jpg",
//     category: "AI/ML + Web Development",
//     tags: ["Deep Learning", "TensorFlow", "Keras", "Google Vision API", "React", "Flask", "GCP"],
//     url: "https://grapho-genius.vercel.app/",
//     github: "https://github.com/Sagarss2664/GraphoGenius",
//     pinned: true,
//   },
//   {
//     id: "project2",
//     title: "Apartment Management System (ApartmentPro)",
//     description:
//       "Full-stack platform with React, Node.js, MongoDB & React Native. Features billing, visitor & vehicle management, notifications. In production use by Hubli residents since Jan 2025.",
//     image: "/projects/AMS0.jpg",
//     category: "Full-Stack Development",
//     tags: ["React", "Node.js", "Express", "MongoDB", "React Native"],
//     url: "https://apartment-pro-afqx.vercel.app/",
//     github: "https://github.com/Sagarss2664/Apartment.git",
//     pinned: true,
//   },
//   {
//     id: "project3",
//     title: "Real-Time Sign Language Gesture Recognition",
//     description:
//       "CNN-LSTM (MobileNetV2) + DeepFace system for gesture and facial emotion recognition. Achieved 92% accuracy; published in CRM 2025 and awarded Best Paper in Robotics.",
//     image: "/projects/RSLRS.png",
//     category: "AI/ML",
//     tags: ["TensorFlow", "Keras", "OpenCV", "DeepFace"],
//     github: "https://github.com/Sagarss2664/Real-Time-Sign-Language-Gesture-Recognition-with-Facial-Expression-Integration.git",
//     pinned: true,
//   },
//   {
//     id: "project4",
//     title: "Automatic Toll Collection System",
//     description:
//       "Prototype simulating toll entry/exit using stopwatch (start, pause, lap, reset).",
//     image: "/projects/ATCS.jpg",
//     category: "Web App",
//     tags: ["C++", "Object Oriented Programming", "Design Patterns"],
//     url: "https://sites.google.com/view/smart-toll-solutions",
//     github: "https://github.com/Sagarss2664/Automatic_Toll_Collection_System_Via_GPS.git",
//     pinned: false,
//   },
//  {
//   id: "project5",
//   title: "3D Point Cloud Segmentation",
//   description:
//     "Advanced segmentation system using RANSAC and DBSCAN to classify urban elements in the KITTI-360 dataset. Achieved 55% efficiency for autonomous driving applications.",
//   image: "/projects/S3dPC.jpg", // 🔹 Add an image in /public/projects
//   category: "AI/ML",
//   tags: ["Python", "Open3D", "RANSAC", "DBSCAN", "Machine Learning"],
//   github: "https://github.com/Sagarss2664/PointCloud-Segmentation", // 🔹 if you have repo
//   pinned: false,
// },
// {
//   id: "project7",
//   title: "Synthetic Human Face Generation Using DCGAN & Fake Image Classification wit Feature Based Explination",
//   description:
//     "Developed a DCGAN-based model to generate realistic synthetic human faces and built a classifier to detect fake images with feature-based explanations.",
//   image: "/projects/new.jpg", // 🔹 add image in /public/projects
//   category: "Deep Learning",
//   tags: ["Deep Learning", "DCGAN", "CNN", "Explainable AI", "Computer Vision"],
//   github: null, // no repo.
//   pinned: false,
// },

// ];


// const certificates: Certificate[] = [
//   {
//     id: "cert1",
//     title: "Best Paper Award – CRM 2025",
//     issuer: "SR University, Warangal",
//     date: "2025",
//     image: "/certificates/Best_paper.png",
//   },
//   {
//     id: "cert2",
//     title: "Seva Prerak Award",
//     issuer: "Youth for Seva",
//     date: "2024",
//     image: "/certificates/2024_Seva_Sambrama.png",
//   },
//   {
//     id: "cert3",
//     title: "Certificate of Presentation",
//     issuer: "AITA - 2025",
//     date: "2025",
//     image: "/certificates/AITA.png",
//   },
// ];
const profile: ProfileInfo = {
  name: "Sagar Subhas Shegunashi",
  title: "Computer Science and Engineering Student",
  bio: "Aspiring Data Scientist | Full-Stack Developer | Passionate about AI/ML, Web Development, and Cognitive Computing.",
  email: "sagarshegunasi2664@gmail.com",
  phone: "+91-8904646173",
  location: "Hubli-580031, Karnataka, India",
  dateOfBirth: "27 April 2004",
  languages: ["English", "Hindi", "Kannada"],
  hobbies: ["Anime", "Making Concepts", "Volunteering", "Gaming"],
  profileImage: "/lovable-uploads/Sagar.jpg", // ✅ fixed path
};

const socialLinks: SocialLink[] = [
  { id: "social1", platform: "LinkedIn", url: "https://www.linkedin.com/in/sagar-shegunashi-aa857526a/", icon: "Linkedin" },
  { id: "social2", platform: "GitHub", url: "https://github.com/Sagarss2664", icon: "Github" },
  { id: "social3", platform: "Gmail", url: "mailto:sagarshegunasi2664@gmail.com", icon: "Mail" },
  { id: "social4", platform: "LeetCode", url: "https://leetcode.com/u/sagar_s_s/", icon: "ExternalLink" },
];

const projects: Project[] = [
  {
    id: "project1",
    title: "Grapho Genius – Handwriting-Based Thinking Style Recognition Tool",
    description: "CNN (VGGNet) model to classify thinking styles...",
    image: "/projects/handwriting.jpg", // ✅ correct
    category: "AI/ML + Web Development",
    tags: ["Deep Learning", "TensorFlow", "Keras", "Google Vision API", "React", "Flask", "GCP"],
    url: "https://grapho-genius.vercel.app/",
    github: "https://github.com/Sagarss2664/GraphoGenius",
    pinned: true,
  },
  {
    id: "project2",
    title: "Apartment Management System (ApartmentPro)",
    description: "Full-stack platform with React, Node.js, MongoDB...",
    image: "/projects/AMS0.jpg",
    category: "Full-Stack Development",
    tags: ["React", "Node.js", "Express", "MongoDB", "React Native"],
    url: "https://apartment-pro-afqx.vercel.app/",
    github: "https://github.com/Sagarss2664/Apartment.git",
    pinned: true,
  },
  {
    id: "project3",
    title: "Real-Time Sign Language Gesture Recognition",
    description: "CNN-LSTM (MobileNetV2) + DeepFace system...",
    image: "/projects/RSLRS.png",
    category: "AI/ML",
    tags: ["TensorFlow", "Keras", "OpenCV", "DeepFace"],
    github: "https://github.com/Sagarss2664/Real-Time-Sign-Language-Gesture-Recognition-with-Facial-Expression-Integration.git",
    pinned: true,
  },
  {
    id: "project4",
    title: "Automatic Toll Collection System",
    description: "Prototype simulating toll entry/exit...",
    image: "/projects/ATCS.jpg",
    category: "Web App",
    tags: ["C++", "OOP", "Design Patterns"],
    url: "https://sites.google.com/view/smart-toll-solutions",
    github: "https://github.com/Sagarss2664/Automatic_Toll_Collection_System_Via_GPS.git",
    pinned: false,
  },
  {
    id: "project5",
    title: "3D Point Cloud Segmentation",
    description: "RANSAC + DBSCAN system for urban classification...",
    image: "/projects/S3dPC.jpg",
    category: "AI/ML",
    tags: ["Python", "Open3D", "RANSAC", "DBSCAN", "ML"],
    github: "https://github.com/Sagarss2664/PointCloud-Segmentation",
    pinned: false,
  },
  {
    id: "project7",
    title: "Synthetic Human Face Generation (DCGAN)",
    description: "Developed a DCGAN-based model to generate faces...",
    image: "/projects/new.jpg", // ✅ must exist in /public/projects
    category: "Deep Learning",
    tags: ["Deep Learning", "DCGAN", "CNN", "XAI", "Computer Vision"],
    github: undefined,
    pinned: false,
  },
];

const certificates: Certificate[] = [
  { id: "cert1", title: "Best Paper Award – CRM 2025", issuer: "SR University", date: "2025", image: "/certificates/Best_paper.png" },
  { id: "cert2", title: "Seva Prerak Award", issuer: "Youth for Seva", date: "2024", image: "/certificates/2024_Seva_Sambrama.png" },
  { id: "cert3", title: "Certificate of Presentation", issuer: "AITA - 2025", date: "2025", image: "/certificates/AITA.png" },
];
const tasks: Task[] = [
  {
    id: "task1",
    title: "Update the design of Portfolio website",
    description: "Redesign and improve portfolio website UI/UX",
    completed: true,
    dueDate: "2025-07-19",
    priority: "medium",
  },
  {
    id: "task2",
    title: "AI Interview Assistant",
    description: "Develop an AI-based interview assistant tool",
    completed: false,
    dueDate: "2025-11-20",
    priority: "high",
    progress: 40,
  },
  {
    id: "task3",
    title: "Learn Backend Node.js and PHP",
    description: "Complete courses and build projects with Node.js and PHP",
    completed: false,
    dueDate: "2025-09-20",
    priority: "medium",
    progress: 20,
  },
  {
    id: "task4",
    title: "Interview Preparation",
    description: "Learning aptitude & coding skills for interview preparation",
    completed: false,
    dueDate: "2025-05-15",
    priority: "high",
    progress: 0,
  },
  {
    id: "task5",
    title: "Improving Communication Skills",
    description: "Further enhance communication and presentation skills",
    completed: false,
    dueDate: "2025-06-30",
    priority: "medium",
    progress: 0,
  }
];



// Programming & Backend
const backendSkills: Skill[] = [
  { id: "s1", name: "C/C++", level: 5, category: "Programming" },
  { id: "s2", name: "Python", level: 5, category: "Programming" },
  { id: "s3", name: "Java (Learning)", level: 3, category: "Programming" },
  { id: "s4", name: "Node.js", level: 4, category: "Backend" },
  { id: "s5", name: "Express.js", level: 3, category: "Backend" },
  { id: "s6", name: "MongoDB", level: 4, category: "Database" },
  { id: "s7", name: "MySQL", level: 4, category: "Database" },
];

// Frontend
const frontendSkills: Skill[] = [
  { id: "s8", name: "React.js", level: 4, category: "Frontend" },
  { id: "s9", name: "HTML5", level: 5, category: "Frontend" },
  { id: "s10", name: "CSS3", level: 4, category: "Frontend" },
  { id: "s11", name: "TailwindCSS (Learning)", level: 4, category: "Frontend" },
  { id: "s12", name: "TypeScript (Learning)", level: 3, category: "Frontend" },
  { id: "s13", name: "JavaScript", level: 4, category: "Frontend" },
];

// DevOps & Cloud (merged)
const devOpsSkills: Skill[] = [
  { id: "s14", name: "Git", level: 5, category: "DevOps" },
  { id: "s15", name: "GitHub", level: 5, category: "DevOps" },
  { id: "s16", name: "Docker", level: 4, category: "DevOps" },
  { id: "s17", name: "Render", level: 4, category: "Cloud" },
  { id: "s18", name: "GCP", level: 3, category: "Cloud" },
  { id: "s19", name: "AWS (Learning)", level: 2, category: "Cloud" },
  { id: "s20", name: "Ansible (Learning)", level: 2, category: "DevOps" },
];

// Design
const designSkills: Skill[] = [
  { id: "s21", name: "UI/UX Design", level: 5, category: "Design" },
];

// Soft Skills
const softSkills: Skill[] = [
  { id: "s22", name: "Communication", level: 4, category: "Soft" },
  { id: "s23", name: "Flexibility", level: 4, category: "Soft" },
  { id: "s24", name: "Adaptability", level: 4, category: "Soft" },
  { id: "s25", name: "Problem Solving", level: 4, category: "Soft" },
  { id: "s26", name: "Leadership", level: 3, category: "Soft" },
  { id: "s27", name: "Team Work", level: 4, category: "Soft" },
];

// Final merged array
const skills: Skill[] = [
  ...backendSkills,
  ...frontendSkills,
  ...devOpsSkills,
  ...designSkills,
  ...softSkills,
];



const education: Education[] = [
  {
    id: "edu1",
    institution: "KLE Technological University, Hubli",
    degree: "B.E",
    field: "Computer Science and Engineering",
    startDate: "2022",
    endDate: "2026",
    description: "CGPA: 8.81 | Coursework: Computer Architecture, Data Science, Software Development, AI/ML.",
  },
  {
    id: "edu2",
    institution: "SRA COMP PU College, Banahatti",
    degree: "PUC",
    field: "Science",
    startDate: "2020",
    endDate: "2022",
    description: "Percentage: 96% | Subjects: Physics, Chemistry, Mathematics, Biology.",
  },
  {
    id: "edu3",
    institution: "SRA High School, Banahatti",
    degree: "SSLC",
    field: "General",
    startDate: "2010",
    endDate: "2020",
    description: "Percentage: 93.12%.",
  },
];
const experience: Experience[] = []; 


// Achievements
const achievements: Achievement[] = [
  {
    id: "ach1",
    title: "Ingenium 2025 – Quest Global",
    date: "2025",
    description: "Selected for idea submission round for proposal 'Finding the Criminal by Gait Feature Analysis'.",
    url: "https://www.youtube.com/watch?v=FB2nJsc-j3c&t=5s"
  },
  {
    id: "ach2",
    title: "Best Paper Award – CRM 2025",
    issuer: "SR University, Warangal",
    date: "2025",
    description: "Awarded Best Paper in Robotics category for 'Real-Time Sign Language Gesture Recognition with Facial Expression Integration'.",
    image: "/certificates/Best_paper.png",
    url: "https://drive.google.com/file/d/1PDaG5Fk_kc02ZtlEEH9R9-SaKhEN9zRz/view"
  },
  {
    id: "ach3",
    title: "Seva Prerak Award",
    issuer: "Youth for Seva",
    date: "2024",
    description: "Completed 300+ hours of volunteering, painting govt schools and teaching students for NMMS exam.",
    image: "/certificates/2024_Seva_Sambrama.png",
    url: "https://drive.google.com/file/d/1QYEa7RWmx7XolMg3m1Zf3FHiU77jRfo-/view"
  }
];

// Extracurricular Activities
const extracurriculars: Extracurricular[] = [
  {
    id: "ext1",
    title: "Youth For Seva",
    role: "Lead Volunteer",
    date: "2024",
    description: "Led initiatives for school painting & cleaning, and conducted NMMS exam training for rural government school students."
  },
  {
    id: "ext2",
    title: "Community Teaching",
    role: "Mentor",
    description: "Conducted free training sessions for underprivileged students preparing for NMMS scholarship exams."
  }
];

const contact: ContactInfo = {
  email: "sagarshegunasi2664@gmail.com",
  location: "Vidyanagar, Hubli - 580031",
};

// CRUD operations but with static data (no localStorage)
export const getProfile = (): ProfileInfo => {
  return profile;
};

export const updateProfile = (updatedProfile: ProfileInfo): void => {
  // Persist to Supabase (single row with fixed id)
  upsert('site_profile', {
    id: 'main',
    name: updatedProfile.name,
    title: updatedProfile.title,
    bio: updatedProfile.bio,
    email: updatedProfile.email,
    phone: updatedProfile.phone,
    location: updatedProfile.location,
    date_of_birth: updatedProfile.dateOfBirth,
    languages: updatedProfile.languages,
    hobbies: updatedProfile.hobbies,
    profile_image: updatedProfile.profileImage,
  });
  console.log("Profile update requested:", updatedProfile);
};

export const getSocialLinks = (): SocialLink[] => {
  return socialLinks;
};

export const addSocialLink = (link: Omit<SocialLink, "id">): SocialLink => {
  const newLink = { ...link, id: generateId() };
  upsert('social_links', newLink);
  console.log("Add social link requested:", newLink);
  return newLink;
};

export const updateSocialLink = (link: SocialLink): void => {
  upsert('social_links', link);
  console.log("Update social link requested:", link);
};

export const deleteSocialLink = (id: string): void => {
  removeById('social_links', id);
  console.log("Delete social link requested:", id);
};

export const getProjects = (): Project[] => {
  return projects;
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((project) => project.id === id);
};

export const addProject = (project: Omit<Project, "id">): Project => {
  const newProject = { ...project, id: generateId() };
  upsert('projects', newProject);
  console.log("Add project requested:", newProject);
  return newProject;
};

export const updateProject = (project: Project): void => {
  upsert('projects', project);
  console.log("Update project requested:", project);
};

export const deleteProject = (id: string): void => {
  removeById('projects', id);
  console.log("Delete project requested:", id);
};

export const getCertificates = (): Certificate[] => {
  return certificates;
};

export const addCertificate = (certificate: Omit<Certificate, "id">): Certificate => {
  const newCertificate = { ...certificate, id: generateId() };
  upsert('certificates', newCertificate);
  console.log("Add certificate requested:", newCertificate);
  return newCertificate;
};

export const updateCertificate = (certificate: Certificate): void => {
  upsert('certificates', certificate);
  console.log("Update certificate requested:", certificate);
};

export const deleteCertificate = (id: string): void => {
  removeById('certificates', id);
  console.log("Delete certificate requested:", id);
};

export const getTasks = (): Task[] => {
  return tasks;
};

export const addTask = (task: Omit<Task, "id">): Task => {
  const newTask = { ...task, id: generateId() };
  upsert('tasks', { ...newTask, due_date: newTask.dueDate });
  console.log("Add task requested:", newTask);
  return newTask;
};

export const updateTask = (task: Task): void => {
  upsert('tasks', { ...task, due_date: task.dueDate });
  console.log("Update task requested:", task);
};

export const deleteTask = (id: string): void => {
  removeById('tasks', id);
  console.log("Delete task requested:", id);
};

export const getSkills = (): Skill[] => {
  return skills;
};

export const addSkill = (skill: Omit<Skill, "id">): Skill => {
  const newSkill = { ...skill, id: generateId() };
  upsert('skills', skill);
  console.log("Add skill requested:", newSkill);
  return newSkill;
};

export const updateSkill = (skill: Skill): void => {
  upsert('skills', skill);
  console.log("Update skill requested:", skill);
};

export const deleteSkill = (id: string): void => {
  removeById('skills', id);
  console.log("Delete skill requested:", id);
};

export const getEducation = (): Education[] => {
  return education;
};

export const addEducation = (educationItem: Omit<Education, "id">): Education => {
  const newEducation = { ...educationItem, id: generateId() };
  upsert('education', { ...newEducation, start_date: newEducation.startDate, end_date: newEducation.endDate });
  console.log("Add education requested:", newEducation);
  return newEducation;
};

export const updateEducation = (educationItem: Education): void => {
  upsert('education', { ...educationItem, start_date: educationItem.startDate, end_date: educationItem.endDate });
  console.log("Update education requested:", educationItem);
};

export const deleteEducation = (id: string): void => {
  removeById('education', id);
  console.log("Delete education requested:", id);
};

export const getExperience = (): Experience[] => {
  return experience;
};

export const addExperience = (experienceItem: Omit<Experience, "id">): Experience => {
  const newExperience = { ...experienceItem, id: generateId() };
  upsert('experience', { ...newExperience, start_date: newExperience.startDate, end_date: newExperience.endDate });
  console.log("Add experience requested:", newExperience);
  return newExperience;
};

export const updateExperience = (experienceItem: Experience): void => {
  upsert('experience', { ...experienceItem, start_date: experienceItem.startDate, end_date: experienceItem.endDate });
  console.log("Update experience requested:", experienceItem);
};

export const deleteExperience = (id: string): void => {
  removeById('experience', id);
  console.log("Delete experience requested:", id);
};

export const getFeedback = (): Feedback[] => {
  return [];
};

export const addFeedback = (feedback: Omit<Feedback, "id" | "date">): Feedback => {
  const newFeedback = { 
    ...feedback, 
    id: generateId(), 
    date: new Date().toISOString() 
  };
  upsert('feedback', newFeedback);
  console.log("Add feedback requested:", newFeedback);
  return newFeedback;
};

export const deleteFeedback = (id: string): void => {
  removeById('feedback', id);
  console.log("Delete feedback requested:", id);
};

export const getContact = (): ContactInfo => {
  return contact;
};

export const updateContact = (updatedContact: ContactInfo): void => {
  upsert('contact_info', { id: 'main', email: updatedContact.email, phone: updatedContact.phone, address: updatedContact.address, location: updatedContact.location });
  console.log("Contact update requested:", updatedContact);
};

// Admin authentication - simplified version without localStorage
export const verifyAdminPassword = (password: string): boolean => {
  return password === "Sagar123"; // Hardcoded password as in the original code
};

export const updateAdminPassword = (newPassword: string): void => {
  console.log("Admin password update requested:", newPassword);
};

export const setAdminStatus = (isAdmin: boolean): void => {
  console.log("Admin status change requested:", isAdmin);
};
// Achievements CRUD
export const getAchievements = (): Achievement[] => {
  return achievements;
};

export const addAchievement = (achievement: Omit<Achievement, "id">): Achievement => {
  const newAchievement = { ...achievement, id: generateId() };
  upsert('achievements', newAchievement);
  console.log("Add achievement requested:", newAchievement);
  return newAchievement;
};

export const updateAchievement = (achievement: Achievement): void => {
  upsert('achievements', achievement);
  console.log("Update achievement requested:", achievement);
};

export const deleteAchievement = (id: string): void => {
  removeById('achievements', id);
  console.log("Delete achievement requested:", id);
};

// Extracurricular CRUD
export const getExtracurriculars = (): Extracurricular[] => {
  return extracurriculars;
};

export const addExtracurricular = (extracurricular: Omit<Extracurricular, "id">): Extracurricular => {
  const newExtracurricular = { ...extracurricular, id: generateId() };
  upsert('extracurriculars', newExtracurricular);
  console.log("Add extracurricular requested:", newExtracurricular);
  return newExtracurricular;
};

export const updateExtracurricular = (extracurricular: Extracurricular): void => {
  upsert('extracurriculars', extracurricular);
  console.log("Update extracurricular requested:", extracurricular);
};

export const deleteExtracurricular = (id: string): void => {
  removeById('extracurriculars', id);
  console.log("Delete extracurricular requested:", id);
};


export const getAdminStatus = (): boolean => {
  return true; // Always return true for demo purposes
};
