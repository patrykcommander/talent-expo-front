"use client";

import React from "react";
import { EducationFormEntry } from "@/types";
import UserProfileEducationComponent from "./user-profile-education-component";
import { Button } from "@/components/ui/button";

const blankEducation: EducationFormEntry = {
  degree: "",
  institution: "",
  fieldOfStudy: undefined,
  grade: undefined,
  thesisTopic: undefined,
  isActive: false,
  startDate: new Date(),
  endDate: undefined,
};

interface UserProfileEducationProps {
  education: EducationFormEntry[] | [];
  handleUserEducationChange: (userEducation: EducationFormEntry[] | []) => void;
}

export default function UserProfileEducation({
  education,
  handleUserEducationChange,
}: UserProfileEducationProps) {
  const handleAddSingleEducation = () => {
    const newEducation = [...education, blankEducation];
    handleUserEducationChange(newEducation);
  };

  const handleRemoveSingleEducation = (singleEducation: EducationFormEntry) => {
    const newEducation = education.filter(
      (education) => education !== singleEducation
    );
    handleUserEducationChange(newEducation);
  };

  const handleEditSingleEducation = (
    singleEducation: EducationFormEntry,
    edit: { name: string; value: string | boolean }
  ) => {
    const index = education.findIndex((entry) => entry === singleEducation);

    const updatedEntry = {
      ...education[index],
      [edit.name]: edit.value,
    };

    const updatedEducation = [
      ...education.slice(0, index),
      updatedEntry,
      ...education.slice(index + 1),
    ];

    handleUserEducationChange(updatedEducation);
  };

  return (
    <div className="flex flex-col gap-8">
      {education.length > 0 &&
        education.map((singleEducation, key) => (
          <UserProfileEducationComponent
            key={key}
            singleEducation={singleEducation}
            handleRemoveSingleEducation={handleRemoveSingleEducation}
            handleEditSingleEducation={handleEditSingleEducation}
          />
        ))}
      <Button
        type="button"
        variant="default"
        size="lg"
        onClick={handleAddSingleEducation}
      >
        Add new Education
      </Button>
    </div>
  );
}
