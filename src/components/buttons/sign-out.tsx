"use client";

import React from "react";
import { useClerk } from "@clerk/nextjs";
import { Button } from "../ui/button";

export default function SignOut() {
  const { signOut } = useClerk();

  return (
    <Button size="sm" variant="outline" onClick={() => signOut()}>
      Sign Out
    </Button>
  );
}
