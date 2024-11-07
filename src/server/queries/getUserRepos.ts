"use server";

import { GithubRepo } from "@/types";
import { octokit } from "@/octokit/octokit";

export const getUserRepos = async (
  githubUserName: string,
  current_page: number,
  elements_per_page: number
): Promise<GithubRepo[] | []> => {
  try {
    const res = await octokit.request(`/users/${githubUserName}/repos`, {
      page: current_page,
      per_page: elements_per_page,
    });
    const reposProperties = res.data as GithubRepo[];
    return reposProperties;
  } catch (err) {
    console.log(err);
    return [];
  }
};
