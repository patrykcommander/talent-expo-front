import { StringToBoolean } from "class-variance-authority/types";

export type NavOption = {
  label: string;
  href: string;
};

export type NextAuthUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export type User = {
  id: string;
  clerkId: string;
  name: string;
  email: string;
  imageUrl: string | null;
  githubUserName: string | null;
  linkedInUrl: string | null;
  created_at: Date;
  updated_at: Date;
};

export type GithubRepo = {
  name: string;
  description?: string;
  created_at: string;
  pushed_at?: string;
  language?: string;
};
