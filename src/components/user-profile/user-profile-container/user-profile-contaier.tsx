import React, { Suspense } from "react";
import Main from "../main/main";
import GithubSection from "../github-section/github-section";
import EmptyState from "@/components/empty-state/empty-state";
import UserEducation from "../user-education/user-education";
import { User } from "@/types";
import LinkedNotConnected from "../linkedin-not-connected/linkedin-not-connected";
import GithubNotConnected from "../github-section/github-not-connected";
import UserExperience from "../user-experience/user-experience";
import UserLanguages from "../user-languages/user-languages";

export default async function UserProfileContainer({
  user,
}: {
  user: User | null;
}) {
  return (
    <>
      {user ? (
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col lg:flex-row gap-8 w-full">
            <Main user={user} />
          </div>
          <div className="flex flex-col justify-evenly xl:flex-row gap-4">
            {!user.linkedInUrl && <LinkedNotConnected />}
            {!user.githubUserName && <GithubNotConnected />}
          </div>
          <UserLanguages user={user} />
          <UserEducation user={user} />
          <UserExperience user={user} />
          {user.githubUserName && (
            <GithubSection githubUserName={user.githubUserName} />
          )}
        </div>
      ) : (
        <div className="w-full pt-8">
          <EmptyState message="No profile data" />
        </div>
      )}
    </>
  );
}
