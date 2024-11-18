"use server";

import { prisma } from "@/db/prisma";
import { User } from "@/types";
import { auth } from "@clerk/nextjs/server";

export const getUser = async (): Promise<User | null> => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
      include: {
        education: {
          orderBy: {
            startDate: "desc",
          },
        },
        experience: {
          orderBy: {
            startDate: "desc",
          },
        },
        languageLink: {
          include: {
            language: true,
          },
        },
      },
    });

    return user;
  } catch (err) {
    console.log("Error: ", JSON.stringify(err));
    return null;
  }
};
