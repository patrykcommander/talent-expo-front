import React from "react";
import { Card } from "@/components/ui/card";
import GithubRepos from "./github-repos";
import CustomQueryProvider from "@/context/CustomQueryProvider";

export default async function GithubSection({
  githubUserName,
}: {
  githubUserName: string;
}) {
  return (
    <Card className="flex flex-col w-full min-h-[72px] min-w-[300px]">
      <div className="flex flex-col h-full gap-4">
        <div className="w-full border-b-2 border-b-gray">
          <p className="font-semibold text-lg">Projects @ Github</p>
        </div>
        <CustomQueryProvider>
          <GithubRepos githubUserName={githubUserName} />
        </CustomQueryProvider>
      </div>
    </Card>
  );
}
