import React from "react";
import { getUser } from "@/server/queries/getUser";
import { Card } from "@/components/ui/card";
import UserEditProfileForm from "@/components/user-profile/user-profile-edit-form/user-profile-edit-form";

export default async function page() {
  const user = await getUser();

  return (
    <Card className="flex flex-col gap-2 w-full">
      <p>Edit your info</p>
      {user !== null && <UserEditProfileForm user={user} />}
    </Card>
  );
}
