"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUserRepos } from "@/server/queries/getUserRepos";
import { RepoComponent } from "./github-repo-component";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ELEMENTS_PER_PAGE } from "./pagination";
import EmptyState from "@/components/empty-state/empty-state";
import { Skeleton } from "@/components/ui/skeleton";

// const data: any = [];

export default function GithubRepos({
  githubUserName,
}: {
  githubUserName: string;
}) {
  const [currentPage, setPage] = useState<number>(1);
  const handlePreviousButton = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const handleNextButton = () => {
    setPage(currentPage + 1);
  };

  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["projects", currentPage],
      queryFn: () =>
        getUserRepos(githubUserName, currentPage, ELEMENTS_PER_PAGE),
      placeholderData: keepPreviousData,
    });

  // const isFetching = false;

  return (
    <div className="flex flex-col gap-4">
      {data && !(data.length > 0) && (
        <EmptyState message="No repositories" customClass="w-full" />
      )}

      {!isFetching && data && data.length > 0 && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full h-full min-h-[320px] items-start">
            {data.map((repo, key) => (
              <RepoComponent key={key} repo={repo} />
            ))}
          </div>
        </>
      )}
      {isFetching && (
        <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 min-h-[320px] gap-2">
          <Skeleton className="w-full h-[120px] bg-gray" />
          <Skeleton className="w-full h-[120px] bg-gray" />
        </div>
      )}
      <div className="flex flex-row gap-8 items-center justify-center">
        <Button
          className={clsx(
            "bg-secondary border-none",
            currentPage == 1 &&
              "disabled bg-gray hover:bg-gray hover:cursor-default"
          )}
          onClick={() => handlePreviousButton()}
        >
          <ArrowLeft />
        </Button>
        <Button
          className={clsx(
            "bg-secondary border-none",
            !data || data.length < ELEMENTS_PER_PAGE
              ? "disabled bg-gray hover:bg-gray hover:cursor-default"
              : ""
          )}
          onClick={() => handleNextButton()}
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
