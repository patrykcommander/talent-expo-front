import React, { Suspense } from "react";
import { User } from "@/types";
import Main from "../main/main";
import { getUser } from "@/server/queries/getUser";
import GithubSection from "../github-section/github-section";

export default async function UserProfileContainer({
  userId,
}: {
  userId: string;
}) {
  const user: User | null = await getUser(userId);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {user ? (
        <div className="flex flex-col lg:flex-row gap-8 w-full pt-8">
          <Main user={user} />
          <div className="flex flex-col w-full lg:w-2/3">
            <GithubSection user={user} />
          </div>
        </div>
      ) : (
        <div>No data</div>
      )}
    </Suspense>
  );
}
