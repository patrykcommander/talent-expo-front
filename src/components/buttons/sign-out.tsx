"use client";

import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <Button size="lg" onClick={() => signOut({ callbackUrl: "/" })}>
      Sign Out
    </Button>
  );
}
