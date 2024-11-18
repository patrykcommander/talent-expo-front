import React from "react";
import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex w-[240px] lg:w-2/12 items-center justify-center">
      <Image
        src="/logo_cleared.png"
        alt="userImage"
        width={100}
        height={100}
        style={{
          objectFit: "cover",
          objectPosition: "bottom",
          borderRadius: "9999px",
        }}
      />
    </div>
  );
}
