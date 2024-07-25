import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="relative flex flex-col">{children}</main>;
}
