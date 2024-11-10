export type NavOption = {
  label: string;
  href: string;
};

export type NextAuthUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export type User = {
  id: string;
  clerkId: string;
  role: "USER" | "ORGANIZER";
  name: string;
  email: string;
  imageUrl?: string | null;
  linkedInUrl?: string | null;
  githubUserName?: string | null;
  bio?: string | null;
  location?: string | null;
  phoneNumber?: string | null;
  created_at: Date;
  updated_at: Date;
  education: Education[];
  experience: Experience[];
};

export type Education = {
  id: string;
  userClerkId: string;
  degree: string;
  institution: string;
  fieldOfStudy?: string | null;
  grade?: string | null;
  thesisTopic?: string;
  isActive: boolean;
  startDate: Date;
  endDate?: Date | null;
  created_at: Date;
  updated_at: Date;
};

export type Experience = {
  id: string;
  userClerkId: string;
  role: string;
  companyName: string;
  location: string;
  description?: string;
  employmentType?: string;
  isActive: boolean;
  startDate: Date;
  endDate?: Date | null;
  created_at: Date;
  updated_at: Date;
};

export type GithubRepo = {
  name: string;
  description?: string;
  created_at: string;
  pushed_at?: string;
  language?: string;
};
