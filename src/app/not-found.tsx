"use client";

import Error from "next/error";

export default function NotFound() {
  return (
    <html lang="en" className="w-full">
      <body className="w-full">
        <Error statusCode={404} />
      </body>
    </html>
  );
}
