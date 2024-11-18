import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <div className="w-full pt-8">{children}</div>;
}
