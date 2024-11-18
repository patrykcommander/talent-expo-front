import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getUser } from "@/server/queries/getUser";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.redirect(
      "http://localhost:3000/error=unauthenticatedUser"
    );
  }

  const user = await getUser();

  const url = user?.githubUserName
    ? "http://localhost:3000/profile"
    : `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=read:user`;

  return NextResponse.redirect(new URL(url));
}
