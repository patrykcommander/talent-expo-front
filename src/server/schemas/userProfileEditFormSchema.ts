import { z } from "zod";
import { dateFormatRegex } from "@/types";

const userEducationSchema = z
  .object({
    degree: z
      .string()
      .min(1, { message: "Degree is required" })
      .max(10, { message: "Degree should not exceed 10 characters" }),

    thesisTopic: z
      .string()
      .nullable()
      .refine((val) => val !== null && val.length > 1, {
        message: "Thesis topic, if provided, must have at least 1 character",
      })
      .or(z.literal("")),

    institution: z.string().min(2, { message: "Institution name is required" }),

    fieldOfStudy: z.string().min(1, { message: "Field Of Study is required" }),

    grade: z
      .string()
      .nullable()
      .refine((val) => val !== null && val.length > 1, {
        message: "Field of study, if provided, must have at least 1 character",
      })
      .or(z.literal("")),

    isActive: z.boolean().refine((value) => typeof value === "boolean", {
      message: "Active status must be true or false",
    }),

    startDate: z.date(),
    endDate: z.date().nullable(),
  })
  .refine(
    (schema) => {
      // if user specifies that education period is active, check if endDate is not null
      if (!schema.isActive) return schema.endDate !== null;
      else return true;
    },
    { message: "End Date should be a valid date", path: ["endDate"] }
  );

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

export const userProfileEditFormSchema = () =>
  z.object({
    imageUrl: z.string().optional(),
    linkedInUrl: z.string().optional(),
    githubUserName: z.string().optional(),
    bio: z.string().optional(),
    location: z.string().optional(),
    phoneNumber: z.string().optional(),
    education: z.array(userEducationSchema).optional().default([]),
    experience: z.array(userExperienceSchema).optional().default([]),
  });
