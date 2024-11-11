"use client";

import React from "react";
import { EducationFormEntry } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckedState } from "@radix-ui/react-checkbox";

interface UserProfileEducationComponentProps {
  singleEducation: EducationFormEntry;
  handleRemoveSingleEducation: (singleEducation: EducationFormEntry) => void;
  handleEditSingleEducation: (
    singleEducation: EducationFormEntry,
    edit: { name: string; value: string | boolean }
  ) => void;
}

export default function UserProfileEducationComponent({
  singleEducation,
  handleRemoveSingleEducation,
  handleEditSingleEducation,
}: UserProfileEducationComponentProps) {
  const onInputElementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleEditSingleEducation(singleEducation, { name, value });
  };

  const onCheckboxChange = (e: CheckedState) => {
    handleEditSingleEducation(singleEducation, {
      name: "isActive",
      value: e,
    });
  };

  return (
    <Card className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        Institution
        <Input
          name="institution"
          type="text"
          value={singleEducation.institution}
          onChange={onInputElementChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        Degree
        <Input
          name="degree"
          type="text"
          value={singleEducation.degree}
          onChange={onInputElementChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        Field of study
        <Input
          name="fieldOfStudy"
          type="text"
          value={singleEducation.fieldOfStudy || ""}
          onChange={onInputElementChange}
        />
      </div>
      <div className="flex flex-row gap-4 items-center">
        <p>Is Active Study?</p>
        <Checkbox
          name="isActive"
          checked={singleEducation.isActive}
          onCheckedChange={onCheckboxChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        Grade
        <Input
          name="grade"
          type="text"
          value={singleEducation.grade || ""}
          onChange={onInputElementChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        Thesis topic
        <Input
          name="thesisTopic"
          type="text"
          value={singleEducation.thesisTopic || ""}
          onChange={onInputElementChange}
        />
      </div>
      <div className="flex justify-end">
        <Button
          type="button"
          variant="destructive"
          size="lg"
          onClick={() => handleRemoveSingleEducation(singleEducation)}
        >
          Remove Section
        </Button>
      </div>
    </Card>
  );
}
