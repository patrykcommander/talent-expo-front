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
import { Education, EducationFormEntry, User } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import UserProfileEducationComponent from "./user-profile-education-component";
import replaceNullWithUndefined from "@/lib/replaceNullWithUndefined";
import { sortByIsActive } from "@/lib/sortByIsActive";
import { updateUserProfile } from "@/server/actions/updateUserProfile";

const blankEducation: EducationFormEntry = {
  degree: "",
  institution: "",
  fieldOfStudy: "",
  grade: null,
  thesisTopic: null,
  isActive: false,
  startDate: new Date(),
  endDate: null,
};

export default function UserEditProfileForm({ user }: { user: User }) {
  const formSchema = userProfileEditFormSchema();

  // remove null values from the education objects, so those can be used as default values (null can't be a default value for an input - hardship with validation etc.)
  const userEducation = replaceNullWithUndefined(user.education);
  const sortedUserEducation: Education[] = sortByIsActive(userEducation);

  const originalUserEducationIds = sortedUserEducation.map(
    (education) => education.id
  );

  const [educationIds, setEducationIds] = useState<string[] | []>(
    originalUserEducationIds
  );

  const handleRemoveEducationId = (educationIndex: number) => {
    const educationIdToRemove = educationIds[educationIndex];
    console.log(educationIdToRemove);

    setEducationIds(educationIds.filter((id) => id !== educationIdToRemove));
  };

  const handleAddEducationId = (educationId: string) => {
    setEducationIds((prevIds) => [...prevIds, educationId]);
  };

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
      //experience: user.experience || [],
    },
  });
  const errors = form.formState.errors;

  const { fields, append, remove } = useFieldArray({
    name: "education",
    control: form.control,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateUserProfile(
      user.clerkId,
      values,
      originalUserEducationIds,
      educationIds
    ).then((res) => {
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
            <p className="font-semibold text-lg pb-2">Education</p>
            <div className="flex flex-col gap-8">
              {fields.map((field, index) => (
                <UserProfileEducationComponent
                  key={field.id}
                  index={index}
                  field={field}
                  errors={errors?.education?.[index] ?? undefined}
                  register={form.register}
                  removeEducation={remove}
                  handleRemoveEducationId={handleRemoveEducationId}
                  setFormValue={form.setValue}
                />
              ))}
              <Button
                type="button"
                variant="default"
                size="lg"
                onClick={() => {
                  append(blankEducation);
                  handleAddEducationId("");
                }}
              >
                Add new Education
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
