import React from "react";
import { Education } from "@/types";
import { formatISO } from "@/lib/date";
import clsx from "clsx";
import { Card } from "@/components/ui/card";

interface UserEducationEntryProps {
  education: Education;
  isLastOne: boolean;
}

export default function UserEducationEntry({
  education,
  isLastOne,
}: UserEducationEntryProps) {
  const classString = clsx(
    "flex flex-col gap-2 col-span-1 w-full p-4",
    education.isActive
      ? "bg-primary text-white rounded-lg"
      : "rounded-lg border-2 border-black"
  );

  return (
    <div
      className={clsx(
        "flex w-full pb-4 text-md",
        !isLastOne && "border-b-2 border-gray"
      )}
    >
      <Card className={classString}>
        <div className="flex w-full gap-4">
          <p className="w-1/3">Istitution:</p>
          <p className="w-2/3">{education.institution}</p>
        </div>
        <div className="flex w-full gap-4">
          <p className="w-1/3">Degree:</p>
          <p className="w-2/3">{education.degree}</p>
        </div>
        <div className="flex w-full gap-4">
          <p className="w-1/3">Field of study: </p>
          <p className="w-2/3">{education.fieldOfStudy}</p>
        </div>
        <div className="flex w-full gap-4">
          <p className="w-1/3">Thesis:</p>
          <p className="w-2/3">{education.thesisTopic}</p>
        </div>
        <div className="flex w-full gap-4">
          <p className="w-1/3">Start date:</p>
          <p className="w-2/3">{formatISO(education.startDate)}</p>
        </div>
        <div className="flex w-full gap-4">
          <p className="w-1/3">End date:</p>
          <p className="w-2/3">
            {education.endDate ? formatISO(education.endDate) : ""}
          </p>
        </div>
        <div className="flex w-full gap-4">
          <p className="w-1/3">Grade:</p>
          <p className="w-2/3">{education.grade}</p>
        </div>
      </Card>
    </div>
  );
}
