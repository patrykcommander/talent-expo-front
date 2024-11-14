import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { getUser } from "@/server/queries/getUser";
import { Card } from "@/components/ui/card";
import UserEditProfileForm from "@/components/user-profile/user-profile-edit-form/user-profile-edit-form";

export default async function page() {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const user = await getUser(userId);

  return (
    <Card className="flex flex-col gap-2 w-full">
      <p>Edit your info</p>
      {user !== null && <UserEditProfileForm user={user} />}
    </Card>
  );
}
