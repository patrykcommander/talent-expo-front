import { EducationFormEntry, ExperienceFormEntry } from "@/types";

export const blankEducation: EducationFormEntry = {
  id: "",
  degree: "",
  institution: "",
  fieldOfStudy: "",
  grade: "",
  thesisTopic: "",
  isActive: false,
  startDate: new Date(),
  endDate: undefined,
};

export const blankExperience: ExperienceFormEntry = {
  id: "",
  role: "",
  companyName: "",
  location: "",
  description: "",
  employmentType: "",
  isActive: false,
  startDate: new Date(),
  endDate: undefined,
};
