import React from "react";
import { User } from "@/types";
import EmptyState from "@/components/empty-state/empty-state";
import { Card } from "@/components/ui/card";
import UserExperienceComponent from "./user-experience-component";

export default function UserExperience({ user }: { user: User }) {
  const sortedExperience = user.experience.sort(
    (a, b) => Number(b.isActive) - Number(a.isActive)
  );

  return (
    <Card className="flex flex-col w-full p-4 gap-4">
      <p className="text-lg font-semibold lg:border-b-2 border-gray w-full lg:w-1/4">
        Experience
      </p>
      {user.education && user.education.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 w-full">
          {sortedExperience.map((experience, key) => (
            <UserExperienceComponent
              key={key}
              experience={experience}
              isLastOne={key === sortedExperience.length - 1}
            />
          ))}
        </div>
      ) : (
        <EmptyState message="No data provided yet" />
      )}
    </Card>
  );
}
