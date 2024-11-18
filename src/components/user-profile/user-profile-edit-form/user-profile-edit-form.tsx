"use client";

import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import { userProfileEditFormSchema } from "@/server/schemas/userProfileEditFormSchema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EducationFormEntry, ExperienceFormEntry, User } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import UserProfileEditEducation from "./user-profile-edit-education";
import { sortByIsActive } from "@/lib/sortByIsActive";
import { updateUserProfile } from "@/server/actions/updateUserProfile";
import {
  blankEducation,
  blankExperience,
  blankLanguage,
} from "./form-constants";
import UserProfileEditExperience from "./user-profile-edit-experience";
import setFormDefaultValues from "@/lib/setFormDefaultValues";
import UserProfileEditLanguage from "./user-profile-edit-language";

interface UserEditProfileFormProps {
  user: User;
}

export default function UserEditProfileForm({
  user,
}: UserEditProfileFormProps) {
  const formSchema = userProfileEditFormSchema();

  const userEducation = setFormDefaultValues(
    user.education
  ) as EducationFormEntry[];

  const userExperience = setFormDefaultValues(
    user.experience
  ) as ExperienceFormEntry[];

  const userLanguages = user.languageLink.map((link, index) => {
    return {
      id: link.languageId,
      proficiency: link.proficiency,
      languageCode: link.language.languageCode,
    };
  });

  const sortedUserEducation = sortByIsActive(userEducation);
  const sortedUserExperience = sortByIsActive(userExperience);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: user?.imageUrl || "",
      linkedInUrl: user.linkedInUrl || "",
      githubUserName: user.githubUserName || "",
      bio: user.bio || "",
      location: user.location || "",
      phoneNumber: user.phoneNumber || "",
      education: sortedUserEducation || [],
      experience: sortedUserExperience || [],
      language: userLanguages || [],
    },
  });
  const errors = form.formState.errors;

  const educationFieldArray = useFieldArray({
    name: "education",
    control: form.control,
  });

  const experienceFieldArray = useFieldArray({
    name: "experience",
    control: form.control,
  });

  const languageFieldArray = useFieldArray({
    name: "language",
    control: form.control,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateUserProfile(user.clerkId, values).then((res) => {
      if (res && res.success) {
        toast.success(res.message);
      } else if (res && !res.success) {
        toast.error(res.message);
      } else {
        toast.error("Could not update user profile");
      }
    });
  };

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} gutter={8} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          id="user-profile-form"
          className="flex flex-col gap-4 justify-between w-full"
          onKeyDown={(e) => e.key == "Enter" && e.preventDefault()}
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile image url</FormLabel>
                <FormMessage />
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormDescription />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="githubUserName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Github username</FormLabel>
                <FormMessage />
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormDescription />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedInUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn profile URL</FormLabel>
                <FormMessage />
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio description</FormLabel>
                <FormMessage />
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormMessage />
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormMessage />
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription />
              </FormItem>
            )}
          />
          <div className="w-full">
            <p className="font-semibold text-lg pb-2">Languages</p>
            <div className="flex flex-col gap-8">
              {languageFieldArray.fields.map((field, index) => (
                <UserProfileEditLanguage
                  key={field.id}
                  index={index}
                  errors={errors?.education?.[index] ?? undefined}
                  removeLanguage={languageFieldArray.remove}
                />
              ))}
              <Button
                type="button"
                variant="default"
                size="lg"
                onClick={() => {
                  languageFieldArray.append(blankLanguage);
                }}
              >
                Add new Language
              </Button>
            </div>
          </div>
          <div className="w-full">
            <p className="font-semibold text-lg pb-2">Education</p>
            <div className="flex flex-col gap-8">
              {educationFieldArray.fields.map((field, index) => (
                <UserProfileEditEducation
                  key={field.id}
                  index={index}
                  field={field}
                  errors={errors?.education?.[index] ?? undefined}
                  register={form.register}
                  removeEducation={educationFieldArray.remove}
                  resetFormValue={form.resetField}
                />
              ))}
              <Button
                type="button"
                variant="default"
                size="lg"
                onClick={() => {
                  educationFieldArray.append(blankEducation);
                }}
              >
                Add new Education
              </Button>
            </div>
          </div>
          <div className="w-full">
            <p className="font-semibold text-lg pb-2">Experience</p>
            <div className="flex flex-col gap-8">
              {experienceFieldArray.fields.map((field, index) => (
                <UserProfileEditExperience
                  key={field.id}
                  index={index}
                  field={field}
                  errors={errors?.experience?.[index] ?? undefined}
                  register={form.register}
                  removeExperience={experienceFieldArray.remove}
                  resetFormValue={form.resetField}
                />
              ))}
              <Button
                type="button"
                variant="default"
                size="lg"
                onClick={() => {
                  experienceFieldArray.append(blankExperience);
                }}
              >
                Add new Experience
              </Button>
            </div>
          </div>
          <Button variant="secondary" size="lg" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
