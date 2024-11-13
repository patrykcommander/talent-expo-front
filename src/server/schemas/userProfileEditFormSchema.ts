import { z } from "zod";

const userEducationSchema = z
  .object({
    id: z.string().or(z.literal("")),

    degree: z
      .string()
      .min(1, { message: "Degree is required" })
      .max(10, { message: "Degree should not exceed 10 characters" }),

    institution: z.string().min(2, { message: "Institution name is required" }),

    fieldOfStudy: z.string().min(1, { message: "Field Of Study is required" }),

    thesisTopic: z
      .string()
      .min(1, {
        message: "Thesis Topic, if provided, must have at least 1 character",
      })
      .or(z.literal("")),

    grade: z
      .string()
      .min(1, { message: "Grade, if provided, must have at least 1 character" })
      .or(z.literal("")),

    isActive: z.boolean(),
    startDate: z.date(),
    endDate: z
      .date({ message: "Provide a valid End Date" })
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (schema) => {
      // if user specifies that education period is inActive, check if endDate is not null
      if (!schema.isActive) return schema.endDate !== null;
      else return true;
    },
    { message: "End Date should be a valid date", path: ["endDate"] }
  );

const userExperienceSchema = z
  .object({
    id: z.string().or(z.literal("")),

    role: z
      .string()
      .min(5, { message: "Role has to be at least 5 characters long" })
      .max(50, { message: "Role can not exceed 50 characters" }),

    companyName: z
      .string()
      .min(2, { message: "Company Name has to be at least 2 characters long" })
      .max(100, { message: "Company Name can not exceed 100 characters" }),

    location: z
      .string()
      .min(2, {
        message: "Location must have at least 2 character",
      })
      .max(100, {
        message: "Location must not exceed 100 characters",
      }),

    description: z
      .string()
      .min(25, {
        message: "Description, if provided, must have at least 25 character",
      })
      .or(z.literal("")),

    employmentType: z
      .string()
      .min(5, {
        message: "Employment Type, if provided, must have at least 5 character",
      })
      .or(z.literal("")),

    isActive: z.boolean(),
    startDate: z.date(),
    endDate: z
      .date({ message: "Provide a valid End Date" })
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (schema) => {
      // if user specifies that experience period is inActive, check if endDate is not null
      if (!schema.isActive) return schema.endDate !== null;
      else return true;
    },
    { message: "End Date should be a valid date", path: ["endDate"] }
  );

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
