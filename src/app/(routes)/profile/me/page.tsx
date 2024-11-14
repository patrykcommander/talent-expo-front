import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import UserProfileContainer from "@/components/user-profile/user-profile-container/user-profile-contaier";
import EmptyState from "@/components/empty-state/empty-state";

export default function page() {
  const { userId } = auth();

  if (userId === null) {
    redirect("/home");
  }

  return (
    <>
      {userId !== null ? (
        <UserProfileContainer userId={userId} />
      ) : (
        <EmptyState message="" />
      )}
    </>
  );
}
