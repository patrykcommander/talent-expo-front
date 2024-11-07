import { prisma } from "@/db/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  // Get the current Clerk user ID
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.redirect(
      "http://localhost:3000/error=unauthenticatedUser"
    );
  }

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      "http://localhost:3000/profile?error=NoGitHubCodeProvided"
    );
  }

  try {
    // Exchange the code for an access token
    const tokenResponse = await fetch(
      `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`,
      {
        method: "POST",
        headers: { Accept: "application/json" },
      }
    );
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return NextResponse.redirect(
        "http://localhost:3000/profile?error=AccessToken"
      );
    }

    // Use the access token to get the GitHub user information
    const githubResponse = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const githubData = await githubResponse.json();

    // Store the GitHub username linked to the Clerk user ID in your database
    await prisma.user.update({
      data: { githubUserName: githubData.login },
      where: { clerkId: userId },
    });

    return NextResponse.redirect("http://localhost:3000/profile");
  } catch (error) {
    console.error("GitHub authorization error:", error);
    return NextResponse.redirect(
      "http://localhost:3000/profile?error=AuthError"
    );
  }
}
