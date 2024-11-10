import React from "react";
import clsx from "clsx";
import { formatISO } from "@/lib/date";
import { Experience } from "@/types";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import UserExperienceAccordion from "./user-experience-accordion";
import { Button } from "@/components/ui/button";

interface UserExperienceComponentProps {
  experience: Experience;
  isLastOne: boolean;
}

export default function UserExperienceComponent({
  experience,
  isLastOne,
}: UserExperienceComponentProps) {
  const classString = clsx(
    "grid grid-cols-1 lg:grid-cols-2 gap-4",
    experience.isActive ? "bg-primary text-white" : "border-2"
  );

  return (
    <Card className={classString}>
      <div className="col-span-1">
        <p className="font-semibold text-lg">{experience.role}</p>
      </div>
      <div className="flex flex-row gap-2 col-span-1">
        <Calendar />
        {formatISO(experience.startDate)} -{" "}
        {experience.endDate && experience.endDate !== null
          ? formatISO(experience.endDate)
          : "Currently employed"}
      </div>
      <div className="col-span-1">
        <p>Employer: {experience.companyName}</p>
      </div>
      <div className="col-span-1">
        <p>Location: {experience.location}</p>
        <p>Employment type: {experience.employmentType}</p>
      </div>
      <div className="w-full col-span-1 lg:col-span-2">
        <UserExperienceAccordion
          isActive={experience.isActive}
          description={experience.description}
        />
      </div>
    </Card>
  );
}
