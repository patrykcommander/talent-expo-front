import React from "react";
import { NavOptions } from "./nav-options";
import NavItem from "./nav-item";
import { User } from "next-auth";
import { verifyIfUserAuthenticated } from "@/lib/verifyIfUserAuthenticated";
import SignOut from "../buttons/sign-out";
import SignIn from "../buttons/sign-in";

export default async function NavBar() {
  const user = await verifyIfUserAuthenticated();

  return (
    <div className="flex flex-row items-center justify-around gap-8 h-[48px] w-3/4 py-8 border-">
      <div className="flex flex-row">
        {NavOptions.map(({ label, href }, key) => (
          <NavItem key={key} label={label} href={href} />
        ))}
      </div>
      {user !== undefined ? <SignOut /> : <SignIn />}
    </div>
  );
}
