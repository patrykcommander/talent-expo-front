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

  const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
  const redirect_uri = "http://localhost:3000/profile";
  const scope = "r_basicprofile";

  const url = user?.linkedInUrl
    ? redirect_uri
    : `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${redirect_uri}&scope=${scope}`;

  return NextResponse.redirect(new URL(url));
}