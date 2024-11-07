import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "date-fns";
import { User } from "@/types";
import { Edit2, UserSquare2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ProfileMainProps {
  user: User;
}

export default function ProfileMain({ user }: ProfileMainProps) {
  return (
    <Card className="flex flex-col lg:w-1/3 max-h-[300px] items-center gap-4 min-w-[300px]">
      <div className="flex flex-col w-full items-center gap-4">
        <div className="flex flex-row w-full items-center justify-end">
          <Link className="flex gap-2" href="/profile/edit">
            <Edit2 color="#001E47" />
            Edit
          </Link>
        </div>
        {user?.imageUrl ? (
          <Image
            src={user.imageUrl}
            width={96}
            height={96}
            alt="user-profile-image"
          ></Image>
        ) : (
          <UserSquare2 color="#001E47" width={96} height={96} />
        )}
      </div>
      <div className="flex flex-col gap-4 border-t-2 border-gray w-full py-2 text-primary">
        <div className="flex flex-col">
          <p className="font-semibold text-lg">{user.name}</p>
          <p className="text-lg">
            since {formatDate(new Date(user.created_at), "MMMM yyyy")}
          </p>
        </div>

        <div className="flex flex-row gap-4 items-center justify-start">
          <Image src="github.svg" width={24} height={24} alt="github-logo" />
          <Link
            className="font-semibold border-b-2 border-primary"
            href={`https://github.com/${user.githubUserName}`}
          >
            {user.githubUserName}
          </Link>
        </div>
      </div>
    </Card>
  );
}
