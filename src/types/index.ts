import { userProfileEditFormSchema } from "@/server/schemas/userProfileEditFormSchema";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { z } from "zod";

export const dateFormatRegex =
  /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

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

export type EducationFormEntry = {
  degree: string;
  institution: string;
  fieldOfStudy: string;
  grade: string | null;
  thesisTopic: string | null;
  isActive: boolean;
  startDate: Date;
  endDate: Date | null;
};

export interface Education extends EducationFormEntry {
  id: string;
  userClerkId: string;
  created_at: Date;
  updated_at: Date;
}

export type Experience = {
  id: string;
  userClerkId: string;
  role: string;
  companyName: string;
  location: string;
  description: string | null;
  employmentType: string | null;
  isActive: boolean;
  startDate: Date;
  endDate: Date | null;
  created_at: Date;
  updated_at: Date;
};

export type GithubRepo = {
  name: string;
  description: string | null;
  created_at: string;
  pushed_at: string | null;
  language: string | null;
};

export type FullProfileFormSchemaType = z.infer<
  ReturnType<typeof userProfileEditFormSchema>
>;

export type EducationError = Merge<
  FieldError,
  FieldErrorsImpl<{
    degree: string;
    institution: string;
    isActive: boolean;
    startDate: Date;
    thesisTopic: string;
    fieldOfStudy: string;
    grade: string;
    endDate: Date;
  }>
>;
