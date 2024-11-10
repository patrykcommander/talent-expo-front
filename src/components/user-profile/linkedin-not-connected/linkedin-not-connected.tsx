import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import RedirectButton from "@/components/buttons/redirect-button";

export default async function LinkedNotConnected() {
  return (
    <div className="flex w-full gap-4">
      <Card className="w-full">
        <div className="flex flex-row gap-4 items-center justify-between h-full">
          <div className="flex gap-2">
            <Image
              color="#001E47"
              src="/linkedin.svg"
              width={24}
              height={24}
              alt="linkedin-logo"
            />
            LinkedIn - Not Connected
          </div>
          <div>
            <RedirectButton
              customClass="bg-primary text-white"
              href="/api/linkedin/login"
              size="lg"
              label="Connect"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
