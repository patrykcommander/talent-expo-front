export default function layout({
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
