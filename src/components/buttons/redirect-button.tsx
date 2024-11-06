"use client";

import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";

interface RedirectButtonProps {
  label: string;
  href: string;
  size?: "default" | "sm" | "lg" | "icon";
}

export default function RedirectButton({
  label,
  href,
  size,
}: RedirectButtonProps) {
  return (
    <Button
      size={size}
      variant="outline"
      //onClick={() => signIn(undefined, { callbackUrl: "/profile" })}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
}
