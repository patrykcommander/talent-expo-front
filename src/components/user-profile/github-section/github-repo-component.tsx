"use client";

import React, { useState } from "react";
import { GithubRepo } from "@/types";
import { Card } from "@/components/ui/card";
import clsx from "clsx";
import { formatDate, formatDistance, parseISO } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const RepoComponent: React.FC<{ repo: GithubRepo }> = ({ repo }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Card className="flex flex-col gap-2 h-[96px]">
          <p className="text-lg font-semibold">{repo.name}</p>
          <p className="">{repo.language}</p>
        </Card>
      </DialogTrigger>
      <DialogContent className="w-[480px]">
        <DialogHeader>
          <div className="flex flex-col gap-4">
            <DialogTitle className="lg:text-xl">
              Repository: {repo.name}
            </DialogTitle>
            <DialogDescription>
              <div className="grid grid-cols-3 gap-2 lg:text-lg text-primary">
                <p className="col-span-1">Description:</p>
                <p className="col-span-2">
                  {repo?.description || "No description"}
                </p>

                <p className="col-span-1">Created:</p>
                <p className="col-span-2">
                  {formatDate(parseISO(repo.created_at), "dd/MM/yyyy")}
                </p>

                <p className="col-span-1">Last push:</p>
                <p className="col-span-2">
                  {formatDistance(parseISO(repo.created_at), new Date(), {
                    addSuffix: true,
                  }) || "No push has been made yet"}
                </p>
              </div>
            </DialogDescription>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
