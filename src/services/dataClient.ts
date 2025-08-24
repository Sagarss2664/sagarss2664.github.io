import { supabase } from "@/integrations/supabase/client";
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
  getFeedback,
  ProfileInfo,
  SocialLink,
  Project,
  Certificate,
  Task,
  Skill,
  Education as Edu,
  Experience as Exp,
  ContactInfo,
  Feedback,
} from "@/services/storageService";

// Generic helpers
const mapProfile = (row: any): ProfileInfo => ({
  name: row.name,
  title: row.title,
  bio: row.bio ?? "",
  email: row.email,
  phone: row.phone ?? undefined,
  location: row.location ?? undefined,
  dateOfBirth: row.date_of_birth ?? undefined,
  languages: row.languages ?? undefined,
  hobbies: row.hobbies ?? undefined,
  profileImage: row.profile_image ?? "",
});

export const fetchProfile = async (): Promise<ProfileInfo> => {
  const { data, error } = await supabase.from("site_profile").select("*").eq("id", "main").maybeSingle();
  if (error || !data) return getProfile();
  return mapProfile(data);
};

export const fetchSocialLinks = async (): Promise<SocialLink[]> => {
  const { data, error } = await supabase.from("social_links").select("*").order("sort_order", { ascending: true });
  if (error || !data || data.length === 0) return getSocialLinks();
  return data as SocialLink[];
};

export const fetchProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase.from("projects").select("*").order("updated_at", { ascending: false });
  if (error || !data || data.length === 0) return getProjects();
  return data as Project[];
};

export const fetchCertificates = async (): Promise<Certificate[]> => {
  const { data, error } = await supabase.from("certificates").select("*").order("date", { ascending: false });
  if (error || !data || data.length === 0) return getCertificates();
  return data as Certificate[];
};

export const fetchTasks = async (): Promise<Task[]> => {
  const { data, error } = await supabase.from("tasks").select("*").order("created_at", { ascending: false });
  if (error || !data || data.length === 0) return getTasks();
  return data.map((t: any) => ({ ...t, dueDate: t.due_date })) as Task[];
};

export const fetchSkills = async (): Promise<Skill[]> => {
  const { data, error } = await supabase.from("skills").select("*").order("created_at", { ascending: true });
  if (error || !data || data.length === 0) return getSkills();
  return data as Skill[];
};

export const fetchEducation = async (): Promise<Edu[]> => {
  const { data, error } = await supabase.from("education").select("*").order("end_date", { ascending: false });
  if (error || !data || data.length === 0) return getEducation();
  return data.map((e: any) => ({ ...e, startDate: e.start_date, endDate: e.end_date })) as Edu[];
};

export const fetchExperience = async (): Promise<Exp[]> => {
  const { data, error } = await supabase.from("experience").select("*").order("end_date", { ascending: false });
  if (error || !data || data.length === 0) return getExperience();
  return data.map((e: any) => ({ ...e, startDate: e.start_date, endDate: e.end_date })) as Exp[];
};

export const fetchContact = async (): Promise<ContactInfo> => {
  const { data, error } = await supabase.from("contact_info").select("*").eq("id", "main").maybeSingle();
  if (error || !data) return getContact();
  return { email: data.email, phone: data.phone ?? undefined, address: data.address ?? undefined, location: data.location ?? undefined };
};

export const fetchFeedback = async (): Promise<Feedback[]> => {
  const { data, error } = await supabase.from("feedback").select("*").order("date", { ascending: false });
  if (error || !data || data.length === 0) return getFeedback();
  return data as Feedback[];
};
