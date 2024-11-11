"use client";

import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { User } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UserProfileEducation from "./user-profile-education";
import { Button } from "@/components/ui/button";

export default function UserEditProfileForm({ user }: { user: User }) {
  const form = useForm<z.infer<typeof userProfileEditFormSchema>>({
    resolver: zodResolver(userProfileEditFormSchema),
    defaultValues: {
      imageUrl: user.imageUrl || undefined,
      linkedInUrl: user.linkedInUrl || undefined,
      githubUserName: user.githubUserName || undefined,
      bio: user.bio || undefined,
      location: user.location || undefined,
      phoneNumber: user.phoneNumber || undefined,
      education: user.education || [],
      //experience: user.experience || [],
    },
  });

  //z.infer<typeof userProfileEditFormSchema>
  const onSubmit = (values: any) => {
    console.log("Submit");
    console.log(values);
  };

  return (
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
          <FormField
            control={form.control}
            name="education"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Education</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <UserProfileEducation
                      education={field.value ? field.value : []}
                      handleUserEducationChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
        </div>
        <Button variant="secondary" size="lg" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
