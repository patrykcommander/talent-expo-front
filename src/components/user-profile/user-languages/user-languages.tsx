import React from "react";
import { User } from "@/types";
import { Card } from "@/components/ui/card";
import EmptyState from "@/components/empty-state/empty-state";

interface UserLanguagesProps {
  user: User;
}

const formatLangProficiency = (proficiency: string) => {
  return proficiency[0] + proficiency.slice(1).toLowerCase();
};

export default function UserLanguages({ user }: UserLanguagesProps) {
  return (
    <Card className="flex flex-col gap-4">
      <p className="text-lg font-semibold border-b-2 border-gray w-[220px]">
        Languages
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        {user.languageLink.length > 0 ? (
          user.languageLink.map((link, index) => (
            <Card key={index} className="grid grid-cols-2 gap-2">
              <p>{link.language.languageName}</p>
              <p>{formatLangProficiency(link.proficiency)}</p>
            </Card>
          ))
        ) : (
          <EmptyState message="No data provided yet" />
        )}
      </div>
    </Card>
  );
}
