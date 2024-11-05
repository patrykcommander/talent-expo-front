"use client";

import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { useClerk } from "@clerk/nextjs";

export default function SignOut() {
  const { signOut } = useClerk();

  return (
    <Button
      size="sm"
      //onClick={() => signOut({ callbackUrl: "/" })}
      onClick={() => signOut({ redirectUrl: "/" })}
    >
      Sign Out
    </Button>
  );
}
