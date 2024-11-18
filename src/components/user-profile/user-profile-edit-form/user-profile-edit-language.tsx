"use client";

import React from "react";
import { LanguageError, SelectOption } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/error-message/error-message";
import ClientSelect from "@/components/select/client";
import { LANGUAGE_PROFICIENCY_OPTIONS } from "./form-constants";

import data from "@/ISO-639.json";

interface UserProfileEditLanguageProps {
  index: number;
  errors: LanguageError | undefined;
  removeLanguage: (index: number) => void;
}

export default function UserProfileEditLanguage({
  index,
  errors,
  removeLanguage,
}: UserProfileEditLanguageProps) {
  const languages: SelectOption[] = Array.from(data);

  return (
    <Card className="flex flex-col gap-4">
      <p className="font-semibold text-lg">#{index + 1}</p>
      <div className="grid grid-cols-4 gap-8">
        <p className="flex items-center col-span-1">Language</p>
        {errors && errors.languageName && (
          <ErrorMessage message={errors.languageName.message} />
        )}
        <div className="flex items-center w-[220px]">
          <ClientSelect
            options={languages}
            name={`language.${index}.languageCode`}
            placeholder="Select a language"
            customClass="w-full"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-4 gap-8">
          <p className="flex items-center col-span-1">Proficiency</p>
          {errors && errors.languageName && (
            <ErrorMessage message={errors.languageName.message} />
          )}
          <div className="flex items-center w-[220px]">
            <ClientSelect
              options={LANGUAGE_PROFICIENCY_OPTIONS}
              name={`language.${index}.proficiency`}
              placeholder="Select level"
              customClass="w-full"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          type="button"
          variant="destructive"
          size="lg"
          onClick={() => {
            removeLanguage(index);
          }}
        >
          Remove Section
        </Button>
      </div>
    </Card>
  );
}
