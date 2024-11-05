"use client";

import React from "react";
import { NavOption } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavItem({ label, href }: NavOption) {
  const pathname = usePathname();

  let isActive: boolean = false;
  if (label !== "Home") {
    isActive = pathname.includes(label.toLowerCase());
  } else {
    isActive = pathname === "/";
  }

  return (
    <div className="flex w-[160px] h-full text-xl text-primary font-semibold">
      <Link
        className={clsx(
          "uppercase text-center w-full py-4 border-b-2",
          isActive ? "border-b-primary" : "border-b-secondary"
        )}
        href={href}
      >
        {label}
      </Link>
    </div>
  );
}
