"use client";

import React, { useState } from "react";
import { Menu } from "lucide-react";
import { NavOptions } from "./nav-options";
import RedirectButton from "../buttons/redirect-button";
import SignOut from "../buttons/sign-out";
import Link from "next/link";

export default function MobileMenu({ userId }: { userId: string | null }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex w-1/4 items-center justify-center lg:hidden">
      <button className="z-20" onClick={() => handleClick()}>
        <Menu width={32} height={32} color="white" />
      </button>
      <div
        className={`fixed flex flex-col justify-center items-center z-10 top-10 right-0 h-3/4 w-1/4 bg-gray transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-[108px]"></div>
        <div className="flex flex-col w-full h-1/2 items-center justify-center gap-8 border-t-2 border-white">
          {NavOptions.map(({ label, href }, key) => (
            <Link
              className="text-lg uppercase text-white"
              key={key}
              href={href}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col w-full gap-4">
          {userId === null ? (
            <div className="flex flex-col w-full gap-4 items-center justify-center p-4">
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
