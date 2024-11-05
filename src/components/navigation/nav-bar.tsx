import React from "react";
import { NavOptions } from "./nav-options";
import NavItem from "./nav-item";

export default async function NavBar() {
  return (
    <div className="hidden lg:flex lg:flex-row lg:justify-start lg:w-6/12">
      {NavOptions.map(({ label, href }, key) => (
        <div
          key={key}
          className="flex w-[160px] h-full text-md text-primary font-semibold text-center"
        >
          <NavItem label={label} href={href} />
        </div>
      ))}
    </div>
  );
}
