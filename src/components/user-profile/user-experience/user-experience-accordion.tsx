"use client";

import React from "react";
import clsx from "clsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Diamond } from "lucide-react";

interface UserExperiencePopoverProps {
  isActive: boolean;
  description: string | null;
}

export default function UserExperienceAccordion({
  isActive,
  description,
}: UserExperiencePopoverProps) {
  const bulletPoints = description?.split("\n").filter((x) => x !== "");

  return (
    <Accordion type="single" collapsible className="w-full p-2">
      <AccordionItem
        value="description"
        className={clsx("border-b", isActive ? "border-white" : "border-black")}
      >
        <AccordionTrigger>Details</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
          {bulletPoints
            ? bulletPoints.map((bulletPoint, key) => (
                <div key={key} className="flex flex-row items-start gap-2">
                  <Diamond
                    width={16}
                    height={16}
                    className="relative top-[0.15em]"
                  />
                  <div className="w-full">{bulletPoint}</div>
                </div>
              ))
            : "No description provided"}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
