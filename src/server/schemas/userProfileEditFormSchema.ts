import { z } from "zod";

const userEducationSchema = z.object({
  degree: z
    .string()
    .min(1, { message: "Degree is required" })
    .max(10, { message: "Degree should not exceed 10 characters" }),

  thesisTopic: z
    .string()
    .optional()
    .refine((val) => val === undefined || val.length > 0, {
      message: "Thesis topic, if provided, must have at least 1 character",
    }),

  institution: z.string().min(1, { message: "Institution name is required" }),

  fieldOfStudy: z
    .string()
    .optional()
    .refine((val) => val === undefined || val.length > 0, {
      message: "Field of study must have at least 1 character if provided",
    }),

  grade: z
    .string()
    .optional()
    .refine((val) => val === undefined || val.length > 0, {
      message: "Grade must have at least 1 character if provided",
    }),

  isActive: z.boolean().refine((value) => typeof value === "boolean", {
    message: "Active status must be true or false",
  }),

  startDate: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Start date is required and must be a valid date",
  }),

  endDate: z
    .date()
    .optional()
    .refine((date) => date === undefined || !isNaN(date.getTime()), {
      message: "End date must be a valid date if provided",
    }),
});

const userExperienceSchema = z.object({
  role: z.string(),
  companyName: z.string(),
  location: z.string(),
  description: z.string().optional(),
  employmentType: z.string().optional(),
  isActive: z.boolean(),
  startDate: z.date(),
  endDate: z.date().optional(),
});

export const userProfileEditFormSchema = z.object({
  imageUrl: z.string().optional(),
  linkedInUrl: z.string().optional(),
  githubUserName: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  phoneNumber: z.string().optional(),
  education: z.array(userEducationSchema).optional().default([]),
  experience: z.array(userExperienceSchema).optional().default([]),
});
