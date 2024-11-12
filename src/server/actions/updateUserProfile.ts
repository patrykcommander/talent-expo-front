"use server";

import { prisma } from "@/db/prisma";
import { userProfileEditFormSchema } from "../schemas/userProfileEditFormSchema";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const findIndices = (
  array: string[],
  condition: (id: string, index: number) => boolean
) =>
  array
    .map((id, index) => (condition(id, index) ? index : -1))
    .filter((index) => index !== -1);

export const updateUserProfile = async (
  userId: string,
  values: z.infer<ReturnType<typeof userProfileEditFormSchema>>,
  origianlEducationIds: string[],
  educationIds: string[]
) => {
  try {
    const {
      githubUserName,
      bio,
      imageUrl,
      linkedInUrl,
      location,
      phoneNumber,
      education,
    } = values;

    const educationIndexToCreate = findIndices(educationIds, (id) => id === "");
    const educationIndexToUpdate = findIndices(educationIds, (id) =>
      origianlEducationIds.includes(id)
    );
    const educationIndexToDelete = findIndices(
      origianlEducationIds,
      (id) => !educationIds.includes(id)
    );

    const educationToCreate = educationIndexToCreate.map((index) => ({
      userClerkId: userId,
      ...education[index],
    }));

    const educationToUpdate = educationIndexToUpdate.map((index) => ({
      where: { id: educationIds[index] },
      data: education[index],
    }));

    const educationIdsToDelete = educationIndexToDelete.map(
      (index) => origianlEducationIds[index]
    );

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
      },
    });

    // delete removed education entries
    if (educationIndexToDelete.length > 0) {
      await prisma.education.deleteMany({
        where: {
          id: {
            in: educationIdsToDelete,
          },
        },
      });
    }

    // create new education entries
    if (educationIndexToCreate.length > 0) {
      await prisma.education.createMany({
        data: educationToCreate,
      });
    }

    revalidatePath("/profile/me/edit");
    return { success: true, message: "Profile updated" };
  } catch (err) {
    console.log("Error: ", err);
    return { success: false, message: "Error while updating the profile" };
  }
};
