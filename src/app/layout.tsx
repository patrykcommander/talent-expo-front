import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignInUrl="/profile" afterSignUpUrl="/profile">
      <html lang="en">
        <body className="w-full">{children}</body>
      </html>
    </ClerkProvider>
  );
}
