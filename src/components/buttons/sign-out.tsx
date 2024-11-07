"use client";

import React from "react";
import { Button } from "../ui/button";
import { useClerk } from "@clerk/nextjs";

export default function SignOut() {
  const { signOut } = useClerk();

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() => signOut({ redirectUrl: "/" })}
    >
      Sign Out
    </Button>
  );
}
