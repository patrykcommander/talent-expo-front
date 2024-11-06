import React from "react";

export default function UserProfileContainer({ user }: { user: string }) {
  return (
    <div className="flex flex-row gap-8 w-full pt-8">User profile: {user}</div>
  );
}
