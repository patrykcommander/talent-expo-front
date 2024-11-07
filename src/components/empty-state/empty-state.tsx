import React from "react";
import { Card } from "../ui/card";
import clsx from "clsx";

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
    <div className="flex items-center justify-center">
      <Card className={customClassString}>{message}</Card>
    </div>
  );
}
