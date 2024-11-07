"use server";

import { prisma } from "@/db/prisma";

export const getUser = async (userId: string) => {
  try {
    let query: any = {};

    query.where = {
      clerkId: userId,
    };

    const user = await prisma.user.findUnique(query);

    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};
