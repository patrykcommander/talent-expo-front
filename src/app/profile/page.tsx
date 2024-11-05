import React from "react";
import { verifyIfUserAuthenticated } from "@/lib/verifyIfUserAuthenticated";
import { redirect } from "next/navigation";
import { NextAuthUser } from "@/types";
import UserProfileContainer from "@/components/user-profile/user-profile-container/user-profile-contaier";

export default async function page() {
  const user: NextAuthUser | undefined = await verifyIfUserAuthenticated();

  if (!user) {
    redirect("/");
  }

  return (
    <>
      {user !== undefined ? (
        <UserProfileContainer user={user} />
      ) : (
        <div>Empty state</div>
      )}
    </>
  );
}
