import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import RedirectButton from "@/components/buttons/redirect-button";
import EmptyState from "@/components/empty-state/empty-state";
import { GithubRepo, User } from "@/types";
import GithubRepos from "./github-repos";
import CustomQueryProvider from "@/context/CustomQueryProvider";
import { getUserRepos } from "@/server/queries/getUserRepos";
import { ELEMENTS_PER_PAGE } from "./pagination";

export default async function GithubSection({ user }: { user: User }) {
  const firstBatchedRepos =
    user.githubUserName !== null
      ? await getUserRepos(user.githubUserName, 1, ELEMENTS_PER_PAGE)
      : [];

  return (
    <Card className="flex flex-col w-full min-h-[72px] min-w-[300px]">
      {user?.githubUserName ? (
        <div className="flex flex-col h-full gap-4">
          <div className="w-full border-b-2 border-b-gray">
            <p className="font-semibold text-lg">Projects</p>
          </div>
          <CustomQueryProvider>
            {firstBatchedRepos.length > 0 ? (
              <GithubRepos
                firstBatchedRepos={firstBatchedRepos}
                githubUserName={user.githubUserName}
              />
            ) : (
              <EmptyState message="No repositories" />
            )}
          </CustomQueryProvider>
        </div>
      ) : (
        <div className="flex flex-row gap-4 items-center justify-between h-full">
          <div className="flex gap-4">
            <Image src="github.svg" width={24} height={24} alt="github-logo" />
            GitHub - Not Connected
          </div>
          <div>
            <RedirectButton
              customClass="bg-primary text-white"
              href="/api/github/login"
              size="lg"
              label="Connect"
            />
          </div>
        </div>
      )}
    </Card>
  );
}
