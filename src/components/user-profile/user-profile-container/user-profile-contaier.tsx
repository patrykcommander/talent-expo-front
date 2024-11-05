import React from "react";
import { NextAuthUser } from "@/types";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function UserProfileContainer({ user }: { user: NextAuthUser }) {
  return (
    <div className="flex flex-row gap-8 w-full pt-8">
      <Card className="flex flex-col items-center justify-center p-8 gap-4">
        <div className="rounded-full border-2 border-primary">
          <Image
            src={user.image as string}
            alt="userImage"
            width={90}
            height={90}
            style={{
              objectFit: "cover",
              objectPosition: "bottom",
              borderRadius: "9999px",
            }}
          />
        </div>
        <div className="grid grid-rows-2 grid-cols-2 gap-x-8 gap-y-4">
          <p className="col-span-1">User email address:</p>
          <p className="col-span-1">{user?.email}</p>
          <p className="col-span-1">Username:</p>
          <p className="col-span-1">{user?.name}</p>
        </div>
      </Card>
      <div className="flex flex-col"></div>
    </div>
  );
}
