import NavBar from "@/components/navigation/nav-bar";
import Logo from "@/components/logo/logo";
import LogginButtons from "@/components/login-buttons/login-buttons";
import MobileMenu from "@/components/navigation/mobile-menu";
import { auth } from "@clerk/nextjs/server";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();

  return (
    <main className="flex flex-col items-center w-full pb-8">
      <div className="h-[36px] bg-primary"></div>
      <div className="flex flex-row items-center justify-between lg:justify-around w-full sticky left-0 top-0 bg-primary h-[100px]">
        <Logo />
        <MobileMenu userId={userId} />
        <NavBar />
        <LogginButtons />
      </div>
      <div className="flex-1 items-center justify-center w-4/5 md:w-3/5">
        {children}
      </div>
    </main>
  );
}
