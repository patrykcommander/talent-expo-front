import React, { Suspense } from "react";
import UserProfileContainer from "@/components/user-profile/user-profile-container/user-profile-contaier";
import { getUser } from "@/server/queries/getUser";
import { User } from "@/types";

export default async function page() {
  const user: User | null = await getUser();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfileContainer user={user} />
    </Suspense>
  );
}
