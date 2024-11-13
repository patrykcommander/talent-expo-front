import { userProfileEditFormSchema } from "@/server/schemas/userProfileEditFormSchema";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { z } from "zod";

export type NavOption = {
  label: string;
  href: string;
};

export type NextAuthUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export type GithubRepo = {
  name: string;
  description: string | null;
  created_at: string;
  pushed_at: string | null;
  language: string | null;
};

export type User = {
  id: string;
  clerkId: string;
  role: "USER" | "ORGANIZER";
  name: string;
  email: string;
  imageUrl: string | null;
  linkedInUrl: string | null;
  githubUserName: string | null;
  bio: string | null;
  location: string | null;
  phoneNumber: string | null;
  created_at: Date;
  updated_at: Date;
  education: EducationPrisma[];
  experience: ExperiencePrisma[];
};

export type EducationFormEntry = {
  id: string;
  degree: string;
  institution: string;
  fieldOfStudy: string;
  grade: string;
  thesisTopic: string;
  isActive: boolean;
  startDate: Date;
  endDate: Date | undefined;
};

export interface EducationPrisma {
  id: string;
  userClerkId: string;
  created_at: Date;
  updated_at: Date;
  degree: string;
  institution: string;
  fieldOfStudy: string;
  grade?: string;
  thesisTopic?: string;
  isActive: boolean;
  startDate: Date;
  endDate?: Date;
}

export type ExperienceFormEntry = {
  id: string;
  role: string;
  companyName: string;
  location: string;
  description: string;
  employmentType: string;
  isActive: boolean;
  startDate: Date;
  endDate: Date | undefined;
};

export type ExperiencePrisma = {
  id: string;
  userClerkId: string;
  created_at: Date;
  updated_at: Date;
  role: string;
  companyName: string;
  location: string;
  description?: string;
  employmentType?: string;
  isActive: boolean;
  startDate: Date;
  endDate?: Date;
};

export type EducationError = Merge<
  FieldError,
  FieldErrorsImpl<{
    degree: string;
    institution: string;
    isActive: boolean;
    thesisTopic: string;
    fieldOfStudy: string;
    grade: string;
    startDate: Date;
    endDate: Date;
  }>
>;

export type ExperienceError = Merge<
  FieldError,
  FieldErrorsImpl<{
    role: string;
    companyName: string;
    location: string;
    description: string;
    employmentType: string;
    isActive: boolean;
    startDate: Date;
    endDate: Date;
  }>
>;

export type FullProfileFormSchemaType = z.infer<
  ReturnType<typeof userProfileEditFormSchema>
>;
