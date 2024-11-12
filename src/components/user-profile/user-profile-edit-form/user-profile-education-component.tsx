"use client";

import React, { useState } from "react";
import {
  Controller,
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EducationError, FullProfileFormSchemaType } from "@/types";

const ErrorMessage: React.FC<{ message: string | undefined }> = ({
  message,
}) => {
  return (
    <p className="text-sm text-red-500">{message || "Wrong input data"}</p>
  );
};

interface UserProfileEducationComponentProps {
  index: number;
  field: FieldArrayWithId<FullProfileFormSchemaType, "education">;
  errors: EducationError | undefined;
  register: UseFormRegister<FullProfileFormSchemaType>;
  removeEducation: UseFieldArrayRemove;
  handleRemoveEducationId: (educationIndex: number) => void;
  setFormValue: UseFormSetValue<FullProfileFormSchemaType>;
}

export default function UserProfileEducationComponent({
  index,
  field,
  errors,
  register,
  removeEducation,
  handleRemoveEducationId,
  setFormValue,
}: UserProfileEducationComponentProps) {
  const [isActive, setIsActive] = useState<boolean>(field.isActive);

  return (
    <Card className="flex flex-col gap-4">
      <p className="font-semibold text-lg">#{index + 1}</p>
      <div className="flex flex-col gap-2">
        Institution
        {errors && errors.institution && (
          <ErrorMessage message={errors.institution.message} />
        )}
        <Input {...register(`education.${index}.institution`)} type="text" />
      </div>
      <div className="flex flex-col gap-2">
        Degree
        {errors && errors.degree && (
          <ErrorMessage message={errors.degree.message} />
        )}
        <Input {...register(`education.${index}.degree`)} type="text" />
      </div>
      <div className="flex flex-col gap-2">
        Field of study
        {errors && errors.fieldOfStudy && (
          <ErrorMessage message={errors.fieldOfStudy.message} />
        )}
        <Input {...register(`education.${index}.fieldOfStudy`)} type="text" />
      </div>
      <div className="flex flex-col gap-2 items-start">
        <div className="flex flex-row gap-4 items-center">
          <p>Is Active Study?</p>
          <Controller
            name={`education.${index}.isActive`}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={() => {
                  setFormValue(`education.${index}.endDate`, null);
                  setIsActive(!isActive);
                  field.onChange(!field.value);
                }}
              />
            )}
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-between gap-2 lg:gap-8 w-full">
          <div className="flex flex-col w-full lg:w-1/2">
            <div className="flex flex-row items-center gap-2 w-full">
              <p className="whitespace-nowrap">Start Date</p>
              <div className="w-full">
                <Controller
                  name={`education.${index}.startDate`}
                  render={({ field }) => (
                    <Input
                      type="date"
                      defaultValue={
                        field.value instanceof Date
                          ? field.value.toISOString().split("T")[0]
                          : new Date(field.value).toISOString().split("T")[0]
                      }
                      onChange={(e) => {
                        const date = e.target.valueAsDate;
                        field.onChange(date);
                      }}
                    />
                  )}
                />
              </div>
            </div>
            {errors && errors.startDate && (
              <div className="flex items-center">
                <ErrorMessage message={errors.startDate.message} />
              </div>
            )}
          </div>

          {!isActive && (
            <div className="flex flex-col w-full lg:w-1/2">
              <div className="flex flex-row items-center w-full gap-4">
                <p className="whitespace-nowrap">End Date</p>
                <div className="w-full">
                  <Controller
                    name={`education.${index}.endDate`}
                    render={({ field }) => (
                      <Input
                        type="date"
                        defaultValue={
                          field.value instanceof Date &&
                          !isNaN(field.value.getTime())
                            ? field.value.toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) => {
                          const date = e.target.valueAsDate;
                          field.onChange(date);
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              {errors && errors.endDate && (
                <div className="flex items-center">
                  <ErrorMessage message={errors.endDate.message} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        Grade
        {errors && errors.grade && (
          <ErrorMessage message={errors.grade.message} />
        )}
        <Input {...register(`education.${index}.grade`)} type="text" />
      </div>
      <div className="flex flex-col gap-2">
        Thesis topic
        {errors && errors.thesisTopic && (
          <ErrorMessage message={errors.thesisTopic.message} />
        )}
        <Input {...register(`education.${index}.thesisTopic`)} type="text" />
      </div>
      <div className="flex justify-end">
        <Button
          type="button"
          variant="destructive"
          size="lg"
          onClick={() => {
            removeEducation(index);
            handleRemoveEducationId(index);
          }}
        >
          Remove Section
        </Button>
      </div>
    </Card>
  );
}
