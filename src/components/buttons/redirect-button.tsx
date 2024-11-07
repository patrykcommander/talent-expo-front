"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface RedirectButtonProps {
  label: string;
  href: string;
  size?: "default" | "sm" | "lg" | "icon";
  customClass?: string;
}

export default function RedirectButton({
  label,
  href,
  size,
  customClass,
}: RedirectButtonProps) {
  return (
    <Button className={customClass} size={size} variant="outline">
      <Link href={href}>{label}</Link>
    </Button>
  );
}
