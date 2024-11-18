"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import clsx from "clsx";
import { Menu } from "lucide-react";
import { NavOptions } from "./nav-options";
import RedirectButton from "../buttons/redirect-button";
import SignOut from "../buttons/sign-out";

export default function MobileMenu() {
  const { userId } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const profileHrefCustomClass =
    userId === null ? "cursor-default text-slate-300" : "";

  return (
    <div className="flex w-[240px] items-center justify-center lg:hidden">
      <div className="flex z-20 w-full items-center justify-center">
        <button onClick={() => handleClick()}>
          <Menu width={32} height={32} color="white" />
        </button>
      </div>
      <div
        className={`fixed flex flex-col justify-between items-center rounded-tl-lg rounded-bl-lg z-10 top-10 right-0 h-[480px] w-[240px] bg-gray transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col w-full h-1/2 pt-[128px] items-center gap-8 border-white">
          {NavOptions.map(({ label, href }, key) => (
            <div key={key} className="flex w-3/4 items-start">
              <Link
                className={clsx(
                  "w-full text-md uppercase text-white",
                  label === "Profile" ? profileHrefCustomClass : ""
                )}
                href={href}
              >
                {label}
              </Link>
            </div>
          ))}
        </div>
        <div className="w-3/4 py-4">
          {userId === null ? (
            <div className="flex flex-col w-full gap-4 items-center justify-center">
              <RedirectButton label="Sign In" href="/sign-in" size="lg" />
              <RedirectButton label="Sign Up" href="/sign-up" size="lg" />
            </div>
          ) : (
            <SignOut />
          )}
        </div>
      </div>
    </div>
  );
}
