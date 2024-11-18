"use server";

import { prisma } from "@/db/prisma";
import { userProfileEditFormSchema } from "../schemas/userProfileEditFormSchema";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import replaceEmptyStringWithNull from "@/lib/replaceEmptyStringWithNull";

import data from "@/ISO-639.json";

const findIndices = (
  array: (string | number)[],
  condition: (id: string | number, index: number) => boolean
): number[] =>
  array.length > 0
    ? array
        .map((id, index) => (condition(id, index) ? index : -1))
        .filter((index) => index !== -1)
    : [];

const splitIds = (
  originalIds: (string | number)[],
  newIds: (string | number)[],
  emptyId: number | null
) => {
  const indexToCreate = findIndices(newIds, (id) => id === emptyId);
  const indexToUpdate = findIndices(newIds, (id) => originalIds.includes(id));
  const indexToDelete = findIndices(originalIds, (id) => !newIds.includes(id));

  return {
    indexToCreate,
    indexToUpdate,
    indexToDelete,
  };
};

export const updateUserProfile = async (
  userId: string,
  values: z.infer<ReturnType<typeof userProfileEditFormSchema>>
) => {
  try {
    values = replaceEmptyStringWithNull(values);

    const {
      githubUserName,
      bio,
      imageUrl,
      linkedInUrl,
      location,
      phoneNumber,
      education,
      experience,
      language,
    } = values;

    // Fetch the original education and experience IDs from the database
    const originalEducationIds: string[] = (
      await prisma.education.findMany({
        where: { userClerkId: userId },
        select: {
          id: true,
        },
      })
    ).map((education: { id: string }) => education.id);

    const originalExperienceIds: string[] = (
      await prisma.experience.findMany({
        where: { userClerkId: userId },
        select: { id: true },
      })
    ).map((experience: { id: string }) => experience.id);

    const languagesAllCodes = Array.from(data).map(
      (language, _) => language.value
    );

    // Get new array of IDs from form
    const newEducationIds = education.map((edu) => edu.id);
    const newExperienceIds = experience.map((exp) => exp.id);

    // Split IDs into categories for create, update, and delete actions
    const educationIndexes = splitIds(
      originalEducationIds,
      newEducationIds,
      null
    );
    const experienceIndexes = splitIds(
      originalExperienceIds,
      newExperienceIds,
      null
    );

    // Create, update, and delete education entries
    // TODO remove or use the id property in rest of the created objects
    const educationToCreate = educationIndexes.indexToCreate.map((index) => {
      const { id, ...rest } = education[index];
      return {
        userClerkId: userId,
        ...rest,
      };
    });

    const educationToUpdate = educationIndexes.indexToUpdate.map((index) => {
      const { id, ...rest } = education[index];

      return {
        where: { id: id },
        data: { ...rest },
      };
    });

    const educationIdsToDelete = educationIndexes.indexToDelete.map(
      (index) => originalEducationIds[index]
    );

    // Create, update, and delete experience entries
    const experienceToCreate = experienceIndexes.indexToCreate.map((index) => {
      const { id, ...rest } = experience[index];
      return {
        userClerkId: userId,
        ...rest,
      };
    });

    const experienceToUpdate = experienceIndexes.indexToUpdate.map((index) => {
      const { id, ...rest } = experience[index];

      return {
        where: { id: id },
        data: { ...rest },
      };
    });

    const experienceIdsToDelete = experienceIndexes.indexToDelete.map(
      (index) => originalExperienceIds[index]
    );

    // Update the user's profile with new data
    await prisma.user.update({
      where: {
        clerkId: userId,
      },
      data: {
        githubUserName,
        bio,
        imageUrl,
        linkedInUrl,
        location,
        phoneNumber,
        education: {
          update: educationToUpdate,
        },
        experience: {
          update: experienceToUpdate,
        },
      },
    });

    // Delete removed education entries
    if (educationIdsToDelete.length > 0) {
      await prisma.education.deleteMany({
        where: {
          id: {
            in: educationIdsToDelete,
          },
        },
      });
    }

    // Create new education entries
    if (educationToCreate.length > 0) {
      await prisma.education.createMany({
        data: educationToCreate,
      });
    }

    // Delete removed experience entries
    if (experienceIdsToDelete.length > 0) {
      await prisma.experience.deleteMany({
        where: {
          id: {
            in: experienceIdsToDelete,
          },
        },
      });
    }

    // Create new experience entries
    if (experienceToCreate.length > 0) {
      await prisma.experience.createMany({
        data: experienceToCreate,
      });
    }

    // Revalidate the profile edit page
    revalidatePath("/profile/me/edit");

    return { success: true, message: "Profile updated" };
  } catch (err) {
    console.log("Error: ", err);
    return { success: false, message: "Error while updating the profile" };
  }
};
