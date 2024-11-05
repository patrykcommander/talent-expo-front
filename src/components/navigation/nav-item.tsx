"use client";

import React from "react";
import { NavOption } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface NavItemProps extends NavOption {
  customClass?: string;
}

export default function NavItem({ label, href, customClass }: NavItemProps) {
  const pathname = usePathname();

  let isActive: boolean = false;
  if (label !== "Home") {
    isActive = pathname.includes(label.toLowerCase());
  } else {
    isActive = pathname === "/";
  }

  return (
    <Link
      className={clsx(
        "uppercase text-white w-full py-2 border-b-2",
        isActive ? "border-b-white" : "border-b-secondary",
        customClass
      )}
      href={href}
    >
      {label}
    </Link>
  );
}
