import React from "react";
import UserProfileContainer from "@/components/user-profile/user-profile-container/user-profile-contaier";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function page() {
  const { userId } = await auth();

  if (userId === null) {
    redirect("/home");
  }

  return (
    <>
      {userId !== null ? (
        <UserProfileContainer userId={userId} />
      ) : (
        <div>Empty state</div>
      )}
    </>
  );
}
