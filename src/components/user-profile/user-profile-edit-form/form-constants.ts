import { EducationFormEntry, ExperienceFormEntry, SelectOption } from "@/types";

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

export const blankLanguage = {
  id: 0,
  languageCode: "",
  proficiency: "",
};

export const LANGUAGE_PROFICIENCY_OPTIONS: SelectOption[] = [
  {
    label: "Elementary",
    value: "ELEMENTARY",
  },
  {
    label: "Intermediate",
    value: "INTERMEDIATE",
  },
  {
    label: "Advanced",
    value: "ADVANCED",
  },
  {
    label: "Fluent",
    value: "FLUENT",
  },
  {
    label: "Native",
    value: "NATIVE",
  },
];
