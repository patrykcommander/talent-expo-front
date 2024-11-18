"use client";

import * as React from "react";
import clsx from "clsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";

interface SelectProps {
  options: { label: string; value: string }[];
  name: string;
  placeholder?: string;
  customClass?: string;
}

export default function ClientSelect({
  options,
  name,
  placeholder = "Select a value",
  customClass,
}: SelectProps) {
  const classString = customClass ? clsx(customClass) : "";

  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Select defaultValue={field.value} onValueChange={field.onChange}>
          <SelectTrigger className={classString}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option, index) => (
              <SelectItem key={index} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
}
