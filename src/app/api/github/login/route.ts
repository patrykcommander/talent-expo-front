import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { getUser } from "@/server/queries/getUser";

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.redirect(
      "http://localhost:3000/error=unauthenticatedUser"
    );
  }

  const user = await getUser(userId);

  const url = user?.githubUserName
    ? "http://localhost:3000/profile"
    : `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=read:user`;

  return NextResponse.redirect(new URL(url));
}
