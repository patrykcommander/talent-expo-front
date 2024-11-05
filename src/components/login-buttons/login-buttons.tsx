import React from "react";
import SignOut from "../buttons/sign-out";
import { auth } from "@clerk/nextjs/server";
import RedirectButton from "../buttons/redirect-button";

export default async function LogginButtons() {
  const { userId } = await auth();

  return (
    <div className="hidden lg:flex lg:items-center lg:justify-center lg:w-4/12">
      {userId === null ? (
        <div className="flex flex-row w-full gap-4 items-center justify-center">
          <RedirectButton label="Sign In" href="/sign-in" size="sm" />
          <p>or</p>
          <RedirectButton label="Sign Up" href="/sign-up" size="sm" />
        </div>
      ) : (
        <SignOut />
      )}
    </div>
  );
}
