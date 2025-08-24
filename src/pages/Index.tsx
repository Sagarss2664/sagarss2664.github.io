
// // import { useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { Code, Award, CheckSquare, Star, Users } from "lucide-react";

// // import ParticlesBackground from "@/components/ParticlesBackground";
// // import Hero from "@/components/sections/Hero";
// // import ProjectsSection from "@/components/sections/projects/ProjectsSection";
// // import CertificatesSection from "@/components/sections/certificates/CertificatesSection";
// // import TasksSection from "@/components/sections/tasks/TasksSection";
// // import SkillsSection from "@/components/sections/SkillsSection";
// // import InterestsSection from "@/components/sections/InterestsSection";
// // import EducationSection from "@/components/sections/EducationSection";
// // import ContactSection from "@/components/sections/ContactSection";
// // import AchievementsSection from "@/components/sections/AchievementsSection";
// // import ExtracurricularSection from "@/components/sections/ExtracurricularSection";
// // import Footer from "@/components/Footer";
// // import TabSwitcher from "@/components/TabSwitcher";
// // import ScrollToTop from "@/components/ScrollToTop";
// // import { ThemeToggle } from "@/components/ThemeToggle";
// // import { useTheme } from "@/contexts/ThemeContext";

// // import {
// //   getProfile,
// //   getSocialLinks,
// //   getProjects,
// //   getCertificates,
// //   getTasks,
// //   getSkills,
// //   getEducation,
// //   getExperience,
// //   getContact,
// //   getAchievements,
// //   getExtracurriculars,
// // } from "@/services/storageService";
// // import {
// //   fetchProfile,
// //   fetchSocialLinks,
// //   fetchProjects as fetchProjectsRemote,
// //   fetchCertificates as fetchCertificatesRemote,
// //   fetchTasks as fetchTasksRemote,
// //   fetchSkills as fetchSkillsRemote,
// //   fetchEducation as fetchEducationRemote,
// //   fetchExperience as fetchExperienceRemote,
// //   fetchContact as fetchContactRemote,
// // } from "@/services/dataClient";

// // const Index = () => {
// //   const { theme } = useTheme();

// //   // Static defaults, replaced with Supabase data
// //   const [profile, setProfile] = useState(getProfile());
// //   const [socialLinks, setSocialLinks] = useState(getSocialLinks());
// //   const [projects, setProjects] = useState(getProjects());
// //   const [certificates, setCertificates] = useState(getCertificates());
// //   const [tasks, setTasks] = useState(getTasks());
// //   const [skills, setSkills] = useState(getSkills());
// //   const [education, setEducation] = useState(getEducation());
// //   const [experience, setExperience] = useState(getExperience());
// //   const [contact, setContact] = useState(getContact());
// //   const [achievements, setAchievements] = useState(getAchievements());
// //   const [extracurriculars, setExtracurriculars] = useState(getExtracurriculars());

// //   const [activeTab, setActiveTab] = useState("projects");
// //   const [isInitialLoad, setIsInitialLoad] = useState(true);
// //   const [mainContentVisible, setMainContentVisible] = useState(false);

// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       setMainContentVisible(true);
// //       setIsInitialLoad(false);
// //     }, 100);
// //     return () => clearTimeout(timer);
// //   }, []);

// //   useEffect(() => {
// //     let mounted = true;
// //     (async () => {
// //       try {
// //         const [p, s, pr, c, t, sk, ed, ex, co] = await Promise.all([
// //           fetchProfile(),
// //           fetchSocialLinks(),
// //           fetchProjectsRemote(),
// //           fetchCertificatesRemote(),
// //           fetchTasksRemote(),
// //           fetchSkillsRemote(),
// //           fetchEducationRemote(),
// //           fetchExperienceRemote(),
// //           fetchContactRemote(),
// //         ]);
// //         if (!mounted) return;
// //         setProfile(p);
// //         setSocialLinks(s);
// //         setProjects(pr);
// //         setCertificates(c);
// //         setTasks(t);
// //         setSkills(sk);
// //         setEducation(ed);
// //         setExperience(ex);
// //         setContact(co);
// //         // achievements & extracurricular are static only for now
// //       } catch (e) {
// //         console.warn("Failed to fetch live data from Supabase, using defaults.", e);
// //       }
// //     })();
// //     return () => { mounted = false; };
// //   }, []);

// //   const sectionVariants = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: { staggerChildren: 0.3, delayChildren: 0.15, duration: 1.0 }
// //     }
// //   };

// //   const itemVariants = {
// //     hidden: { opacity: 0, y: 40 },
// //     visible: { opacity: 1, y: 0, transition: { duration: 1.0 } }
// //   };

// //   return (
// //     <>
// //       {/* Background + theme toggle */}
// //       <div className={`fixed top-0 left-0 w-full h-[25vh] bg-gradient-to-b ${
// //         theme === 'light' ? 'from-light-dark via-light-dark/5 to-transparent' : 'from-black via-black/70 to-transparent'
// //       } z-[-9]`} />
// //       <div className={`fixed inset-0 z-[-10] ${theme === 'light' ? 'bg-light-bg' : 'bg-black'} opacity-90`} />
// //       <div className="fixed top-4 right-4 z-50"><ThemeToggle /></div>

// //       <div className="relative z-10 bg-transparent min-h-screen">
// //         <AnimatePresence mode="wait">
// //           {mainContentVisible && (
// //             <motion.div
// //               key="main-content"
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               transition={{ duration: 1.2, ease: "easeOut" }}
// //               className="w-full"
// //             >
// //               <ParticlesBackground />

// //               <motion.div
// //                 initial={isInitialLoad ? "hidden" : false}
// //                 animate="visible"
// //                 variants={sectionVariants}
// //                 className="relative z-10"
// //               >
// //                 <motion.div variants={itemVariants}>
// //                   <Hero profile={profile} socialLinks={socialLinks} />
// //                 </motion.div>

// //                 {/* Tabbed content */}
// //                 <motion.section id="content-tabs" className="py-16" variants={itemVariants}>
// //                   <div className="container mx-auto px-4">
// //                     <TabSwitcher tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
// //                     <AnimatePresence mode="wait">
// //                       <motion.div
// //                         key={activeTab}
// //                         initial={{ opacity: 0, y: 20 }}
// //                         animate={{ opacity: 1, y: 0 }}
// //                         exit={{ opacity: 0, y: -20 }}
// //                         transition={{ duration: 0.8 }}
// //                         className="min-h-[400px]"
// //                       >
// //                         {activeTab === "projects" && <ProjectsSection projects={projects} />}
// //                         {activeTab === "certificates" && <CertificatesSection certificates={certificates} />}
// //                         {activeTab === "tasks" && <TasksSection tasks={tasks} />}
// //                         {activeTab === "achievements" && <AchievementsSection achievements={achievements} />}
// //                         {activeTab === "extracurricular" && <ExtracurricularSection extracurriculars={extracurriculars} />}
// //                       </motion.div>
// //                     </AnimatePresence>
// //                   </div>
// //                 </motion.section>

// //                 <motion.div variants={itemVariants}><SkillsSection skills={skills} /></motion.div>
// //                 <motion.div variants={itemVariants}><InterestsSection /></motion.div>
// //                 <motion.div variants={itemVariants}><EducationSection education={education} /></motion.div>
// //                 <motion.div variants={itemVariants}><ContactSection contact={contact} /></motion.div>
// //               </motion.div>

// //               <Footer socialLinks={socialLinks} />
// //               <ScrollToTop />
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //       </div>
// //     </>
// //   );
// // };

// // const tabs = [
// //   { id: "projects", label: "Projects", icon: <Code size={16} /> },
// //   { id: "certificates", label: "Certificates", icon: <Award size={16} /> },
// //   // { id: "tasks", label: "Tasks", icon: <CheckSquare size={16} /> },
// //   { id: "achievements", label: "Achievements", icon: <Star size={16} /> },
// //   { id: "extracurricular", label: "Extracurricular", icon: <Users size={16} /> },
// // ];

// // export default Index;
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Code, Award, CheckSquare, Star, Users } from "lucide-react";

// import ParticlesBackground from "@/components/ParticlesBackground";
// import Hero from "@/components/sections/Hero";
// import ProjectsSection from "@/components/sections/projects/ProjectsSection";
// import CertificatesSection from "@/components/sections/certificates/CertificatesSection";
// import TasksSection from "@/components/sections/tasks/TasksSection";
// import SkillsSection from "@/components/sections/SkillsSection";
// import InterestsSection from "@/components/sections/InterestsSection";
// import EducationSection from "@/components/sections/EducationSection";
// import ContactSection from "@/components/sections/ContactSection";
// import AchievementsSection from "@/components/sections/AchievementsSection";
// import ExtracurricularSection from "@/components/sections/ExtracurricularSection";
// import Footer from "@/components/Footer";
// import TabSwitcher from "@/components/TabSwitcher";
// import ScrollToTop from "@/components/ScrollToTop";
// import { ThemeToggle } from "@/components/ThemeToggle";
// import { useTheme } from "@/contexts/ThemeContext";

// import {
//   getProfile,
//   getSocialLinks,
//   getProjects,
//   getCertificates,
//   getTasks,
//   getSkills,
//   getEducation,
//   getExperience,
//   getContact,
//   getAchievements,
//   getExtracurriculars,
// } from "@/services/storageService";
// import {
//   fetchProfile,
//   fetchSocialLinks,
//   fetchProjects as fetchProjectsRemote,
//   fetchCertificates as fetchCertificatesRemote,
//   fetchTasks as fetchTasksRemote,
//   fetchSkills as fetchSkillsRemote,
//   fetchEducation as fetchEducationRemote,
//   fetchExperience as fetchExperienceRemote,
//   fetchContact as fetchContactRemote,
// } from "@/services/dataClient";

// // Define ContactInfo interface here if not already defined elsewhere
// interface ContactInfo {
//   email: string;
//   phone?: string;
//   address?: string;
//   location?: string;
// }

// const Index = () => {
//   const { theme } = useTheme();

//   // Static defaults, replaced with Supabase data
//   const [profile, setProfile] = useState(getProfile());
//   const [socialLinks, setSocialLinks] = useState(getSocialLinks());
//   const [projects, setProjects] = useState(getProjects());
//   const [certificates, setCertificates] = useState(getCertificates());
//   const [tasks, setTasks] = useState(getTasks());
//   const [skills, setSkills] = useState(getSkills());
//   const [education, setEducation] = useState(getEducation());
//   const [experience, setExperience] = useState(getExperience());
//   const [contact, setContact] = useState<ContactInfo>(getContact());
//   const [achievements, setAchievements] = useState(getAchievements());
//   const [extracurriculars, setExtracurriculars] = useState(getExtracurriculars());

//   const [activeTab, setActiveTab] = useState("projects");
//   const [isInitialLoad, setIsInitialLoad] = useState(true);
//   const [mainContentVisible, setMainContentVisible] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setMainContentVisible(true);
//       setIsInitialLoad(false);
//     }, 100);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         const [p, s, pr, c, t, sk, ed, ex, co] = await Promise.all([
//           fetchProfile(),
//           fetchSocialLinks(),
//           fetchProjectsRemote(),
//           fetchCertificatesRemote(),
//           fetchTasksRemote(),
//           fetchSkillsRemote(),
//           fetchEducationRemote(),
//           fetchExperienceRemote(),
//           fetchContactRemote(),
//         ]);
//         if (!mounted) return;
//         setProfile(p);
//         setSocialLinks(s);
//         setProjects(pr);
//         setCertificates(c);
//         setTasks(t);
//         setSkills(sk);
//         setEducation(ed);
//         setExperience(ex);
//         setContact(co as ContactInfo);
//         // achievements & extracurricular are static only for now
//       } catch (e) {
//         console.warn("Failed to fetch live data from Supabase, using defaults.", e);
//       }
//     })();
//     return () => { mounted = false; };
//   }, []);

//   const sectionVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.3, delayChildren: 0.15, duration: 1.0 }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 40 },
//     visible: { opacity: 1, y: 0, transition: { duration: 1.0 } }
//   };

//   return (
//     <>
//       {/* Background + theme toggle */}
//       <div className={`fixed top-0 left-0 w-full h-[25vh] bg-gradient-to-b ${
//         theme === 'light' ? 'from-light-dark via-light-dark/5 to-transparent' : 'from-black via-black/70 to-transparent'
//       } z-[-9]`} />
//       <div className={`fixed inset-0 z-[-10] ${theme === 'light' ? 'bg-light-bg' : 'bg-black'} opacity-90`} />
//       <div className="fixed top-4 right-4 z-50"><ThemeToggle /></div>

//       <div className="relative z-10 bg-transparent min-h-screen">
//         <AnimatePresence mode="wait">
//           {mainContentVisible && (
//             <motion.div
//               key="main-content"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 1.2, ease: "easeOut" }}
//               className="w-full"
//             >
//               <ParticlesBackground />

//               <motion.div
//                 initial={isInitialLoad ? "hidden" : false}
//                 animate="visible"
//                 variants={sectionVariants}
//                 className="relative z-10"
//               >
//                 <motion.div variants={itemVariants}>
//                   <Hero profile={profile} socialLinks={socialLinks} />
//                 </motion.div>

//                 {/* Tabbed content */}
//                 <motion.section id="content-tabs" className="py-16" variants={itemVariants}>
//                   <div className="container mx-auto px-4">
//                     <TabSwitcher tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
//                     <AnimatePresence mode="wait">
//                       <motion.div
//                         key={activeTab}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -20 }}
//                         transition={{ duration: 0.8 }}
//                         className="min-h-[400px]"
//                       >
//                         {activeTab === "projects" && <ProjectsSection projects={projects} />}
//                         {activeTab === "certificates" && <CertificatesSection certificates={certificates} />}
//                         {activeTab === "tasks" && <TasksSection tasks={tasks} />}
//                         {activeTab === "achievements" && <AchievementsSection achievements={achievements} />}
//                         {activeTab === "extracurricular" && <ExtracurricularSection extracurriculars={extracurriculars} />}
//                       </motion.div>
//                     </AnimatePresence>
//                   </div>
//                 </motion.section>

//                 <motion.div variants={itemVariants}><SkillsSection skills={skills} /></motion.div>
//                 <motion.div variants={itemVariants}><InterestsSection /></motion.div>
//                 <motion.div variants={itemVariants}><EducationSection education={education} /></motion.div>
                
//                 {/* Fixed ContactSection usage */}
//                 <motion.div variants={itemVariants}>
//                   <ContactSection contact={contact} />
//                 </motion.div>
//               </motion.div>

//               <Footer socialLinks={socialLinks} />
//               <ScrollToTop />
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </>
//   );
// };

// const tabs = [
//   { id: "projects", label: "Projects", icon: <Code size={16} /> },
//   { id: "certificates", label: "Certificates", icon: <Award size={16} /> },
//   // { id: "tasks", label: "Tasks", icon: <CheckSquare size={16} /> },
//   { id: "achievements", label: "Achievements", icon: <Star size={16} /> },
//   { id: "extracurricular", label: "Extracurricular", icon: <Users size={16} /> },
// ];

// export default Index;
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Award, CheckSquare, Star, Users } from "lucide-react";

import ParticlesBackground from "@/components/ParticlesBackground";
import Hero from "@/components/sections/Hero";
import ProjectsSection from "@/components/sections/projects/ProjectsSection";
import CertificatesSection from "@/components/sections/certificates/CertificatesSection";
import TasksSection from "@/components/sections/tasks/TasksSection";
import SkillsSection from "@/components/sections/SkillsSection";
import InterestsSection from "@/components/sections/InterestsSection";
import EducationSection from "@/components/sections/EducationSection";
import ContactSection from "@/components/sections/ContactSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import ExtracurricularSection from "@/components/sections/ExtracurricularSection";
import Footer from "@/components/Footer";
import TabSwitcher from "@/components/TabSwitcher";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";

import {
  getProfile,
  getSocialLinks,
  getProjects,
  getCertificates,
  getTasks,
  getSkills,
  getEducation,
  getExperience,
  getContact,
  getAchievements,
  getExtracurriculars,
} from "@/services/storageService";
import {
  fetchProfile,
  fetchSocialLinks,
  fetchProjects as fetchProjectsRemote,
  fetchCertificates as fetchCertificatesRemote,
  fetchTasks as fetchTasksRemote,
  fetchSkills as fetchSkillsRemote,
  fetchEducation as fetchEducationRemote,
  fetchExperience as fetchExperienceRemote,
  fetchContact as fetchContactRemote,
} from "@/services/dataClient";

// Define ContactInfo interface here if not already defined elsewhere
interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
  location?: string;
}

const Index = () => {
  const { theme } = useTheme();

  // Static defaults, replaced with Supabase data
  const [profile, setProfile] = useState(getProfile());
  const [socialLinks, setSocialLinks] = useState(getSocialLinks());
  const [projects, setProjects] = useState(getProjects());
  const [certificates, setCertificates] = useState(getCertificates());
  const [tasks, setTasks] = useState(getTasks());
  const [skills, setSkills] = useState(getSkills());
  const [education, setEducation] = useState(getEducation());
  const [experience, setExperience] = useState(getExperience());
  const [contact, setContact] = useState<ContactInfo>(getContact());
  const [achievements, setAchievements] = useState(getAchievements());
  const [extracurriculars, setExtracurriculars] = useState(getExtracurriculars());

  const [activeTab, setActiveTab] = useState("projects");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [mainContentVisible, setMainContentVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMainContentVisible(true);
      setIsInitialLoad(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [p, s, pr, c, t, sk, ed, ex, co] = await Promise.all([
          fetchProfile(),
          fetchSocialLinks(),
          fetchProjectsRemote(),
          fetchCertificatesRemote(),
          fetchTasksRemote(),
          fetchSkillsRemote(),
          fetchEducationRemote(),
          fetchExperienceRemote(),
          fetchContactRemote(),
        ]);
        if (!mounted) return;
        setProfile(p);
        setSocialLinks(s);
        setProjects(pr);
        setCertificates(c);
        setTasks(t);
        setSkills(sk);
        setEducation(ed);
        setExperience(ex);
        setContact(co as ContactInfo);
        // achievements & extracurricular are static only for now
      } catch (e) {
        console.warn("Failed to fetch live data from Supabase, using defaults.", e);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.15, duration: 1.0 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.0 } }
  };

  return (
    <>
      {/* Background + theme toggle */}
      <div className={`fixed top-0 left-0 w-full h-[25vh] bg-gradient-to-b ${
        theme === 'light' ? 'from-light-dark via-light-dark/5 to-transparent' : 'from-black via-black/70 to-transparent'
      } z-[-9]`} />
      <div className={`fixed inset-0 z-[-10] ${theme === 'light' ? 'bg-light-bg' : 'bg-black'} opacity-90`} />
      <div className="fixed top-4 right-4 z-50"><ThemeToggle /></div>

      <div className="relative z-10 bg-transparent min-h-screen">
        <AnimatePresence mode="wait">
          {mainContentVisible && (
            <motion.div
              key="main-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full"
            >
              <ParticlesBackground />

              <motion.div
                initial={isInitialLoad ? "hidden" : false}
                animate="visible"
                variants={sectionVariants}
                className="relative z-10"
              >
                <motion.div variants={itemVariants}>
                  <Hero profile={profile} socialLinks={socialLinks} />
                </motion.div>

                {/* Tabbed content */}
                <motion.section id="content-tabs" className="py-16" variants={itemVariants}>
                  <div className="container mx-auto px-4">
                    <TabSwitcher tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8 }}
                        className="min-h-[400px]"
                      >
                        {activeTab === "projects" && <ProjectsSection projects={projects} />}
                        {activeTab === "certificates" && <CertificatesSection certificates={certificates} />}
                        {activeTab === "tasks" && <TasksSection tasks={tasks} />}
                        {activeTab === "achievements" && <AchievementsSection achievements={achievements} />}
                        {activeTab === "extracurricular" && <ExtracurricularSection extracurriculars={extracurriculars} />}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.section>

                <motion.div variants={itemVariants}><SkillsSection skills={skills} /></motion.div>
                <motion.div variants={itemVariants}><InterestsSection /></motion.div>
                <motion.div variants={itemVariants}><EducationSection education={education} /></motion.div>
                
                {/* Check if ContactSection expects a contact prop */}
                <motion.div variants={itemVariants}>
                  <ContactSection />
                </motion.div>
              </motion.div>

              <Footer socialLinks={socialLinks} />
              <ScrollToTop />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

const tabs = [
  { id: "projects", label: "Projects", icon: <Code size={16} /> },
  { id: "certificates", label: "Certificates", icon: <Award size={16} /> },
  // { id: "tasks", label: "Tasks", icon: <CheckSquare size={16} /> },
  { id: "achievements", label: "Achievements", icon: <Star size={16} /> },
  { id: "extracurricular", label: "Extracurricular", icon: <Users size={16} /> },
];

export default Index;