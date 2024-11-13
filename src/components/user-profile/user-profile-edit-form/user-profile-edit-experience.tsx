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
import { ExperienceError, FullProfileFormSchemaType } from "@/types";
import { Textarea } from "@/components/ui/textarea";

const ErrorMessage: React.FC<{ message: string | undefined }> = ({
  message,
}) => {
  return (
    <p className="text-sm text-red-500">{message || "Wrong input data"}</p>
  );
};

interface UserProfileEditExperienceProps {
  index: number;
  field: FieldArrayWithId<FullProfileFormSchemaType, "experience">;
  errors: ExperienceError | undefined;
  register: UseFormRegister<FullProfileFormSchemaType>;
  removeExperience: UseFieldArrayRemove;
  setFormValue: UseFormSetValue<FullProfileFormSchemaType>;
}

export default function UserProfileEditExperience({
  index,
  field,
  errors,
  register,
  removeExperience,
  setFormValue,
}: UserProfileEditExperienceProps) {
  const [isActive, setIsActive] = useState<boolean>(field.isActive);

  return (
    <Card className="flex flex-col gap-4">
      <p className="font-semibold text-lg">#{index + 1}</p>
      <div className="flex flex-col gap-2">
        Company Name
        {errors && errors.companyName && (
          <ErrorMessage message={errors.companyName.message} />
        )}
        <Input {...register(`experience.${index}.companyName`)} type="text" />
      </div>
      <div className="flex flex-col gap-2">
        Role
        {errors && errors.role && (
          <ErrorMessage message={errors.role.message} />
        )}
        <Input {...register(`experience.${index}.role`)} type="text" />
      </div>
      <div className="flex flex-col gap-2">
        Location
        {errors && errors.location && (
          <ErrorMessage message={errors.location.message} />
        )}
        <Input {...register(`experience.${index}.location`)} type="text" />
      </div>
      <div className="flex flex-col gap-2">
        Employment Type
        {errors && errors.employmentType && (
          <ErrorMessage message={errors.employmentType.message} />
        )}
        <Input
          {...register(`experience.${index}.employmentType`)}
          type="text"
        />
      </div>
      <div className="flex flex-col w-full h-[200px] gap-2">
        <p>Description</p>
        {errors && errors.description && (
          <div className="flex items-center">
            <ErrorMessage message={errors.description.message} />
          </div>
        )}
        <Controller
          name={`experience.${index}.description`}
          render={({ field }) => (
            <Textarea
              className="w-full h-full"
              defaultValue={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <div className="flex flex-col gap-2 items-start">
        <div className="flex flex-row gap-4 items-center">
          <p>Is Active Position?</p>
          <Controller
            name={`experience.${index}.isActive`}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={() => {
                  setFormValue(`experience.${index}.endDate`, undefined);
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
                  name={`experience.${index}.startDate`}
                  render={({ field }) => (
                    <Input
                      type="date"
                      defaultValue={
                        field.value instanceof Date
                          ? field.value.toISOString().split("T")[0]
                          : new Date(field.value).toISOString().split("T")[0]
                      }
                      onChange={(e) => {
                        field.onChange(e.target.valueAsDate);
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
                    name={`experience.${index}.endDate`}
                    render={({ field }) => (
                      <Input
                        type="date"
                        defaultValue={
                          field.value instanceof Date
                            ? field.value.toISOString().split("T")[0]
                            : undefined
                        }
                        onChange={(e) => {
                          field.onChange(e.target.valueAsDate || undefined);
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
      <div className="flex justify-end">
        <Button
          type="button"
          variant="destructive"
          size="lg"
          onClick={() => {
            removeExperience(index);
          }}
        >
          Remove Section
        </Button>
      </div>
    </Card>
  );
}
