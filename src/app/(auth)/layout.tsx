import NavBar from "@/components/navigation/nav-bar";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      {children}
    </div>
  );
}
