"use server";

import { prisma } from "@/db/prisma";
import { User } from "@/types";

export const getUser = async (userId: string): Promise<User | null> => {
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
        experience: true,
      },
    });

    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};
