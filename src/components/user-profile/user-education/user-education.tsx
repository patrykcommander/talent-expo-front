import React from "react";
import { Education, EducationFormEntry, User } from "@/types";
import EmptyState from "@/components/empty-state/empty-state";
import { Card } from "@/components/ui/card";
import UserEducationEntry from "./user-education-component";
import { sortByIsActive } from "@/lib/sortByIsActive";

export default function UserEducation({ user }: { user: User }) {
  const sortedEducation = sortByIsActive(user.education);

  return (
    <Card className="flex flex-col w-full p-4 gap-4">
      <p className="text-lg font-semibold lg:border-b-2 border-gray w-full lg:w-1/4">
        Education
      </p>
      {user.education && user.education.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 w-full">
          {sortedEducation.map((education, key) => (
            <UserEducationEntry
              key={key}
              education={education}
              isLastOne={key === user.education.length - 1}
            />
          ))}
        </div>
      ) : (
        <EmptyState message="No data provided yet" />
      )}
    </Card>
  );
}
