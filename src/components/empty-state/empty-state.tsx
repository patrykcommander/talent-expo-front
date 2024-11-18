import React from "react";
import clsx from "clsx";
import { Card } from "../ui/card";

interface EmptyStateProps {
  message: string;
  customClass?: string;
}

export default function EmptyState({ message, customClass }: EmptyStateProps) {
  const customClassString = clsx(
    "text-center font-semibold w-full text-lg",
    customClass
  );

  return (
    <div className="flex items-center justify-center w-full">
      <Card className={customClassString}>{message}</Card>
    </div>
  );
}
