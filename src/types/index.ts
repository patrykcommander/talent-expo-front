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
  name: string;
  email: string;
  imageUrl: string;
  githubUsername: string;
  linkedIn: string;
  created_at: Date;
  updated_at: Date;
};
