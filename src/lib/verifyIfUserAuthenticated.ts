"use server";

import { getServerSession } from "next-auth";

export const verifyIfUserAuthenticated = async () => {
  const session = await getServerSession();

  return session?.user;
};
