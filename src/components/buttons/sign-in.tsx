"use client";

import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <Button
      size="lg"
      onClick={() => signIn(undefined, { callbackUrl: "/profile" })}
    >
      Sign In
    </Button>
  );
}
