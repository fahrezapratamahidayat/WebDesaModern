import { useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/ui/card";
import SidebarAdmin from "../sidebar/sidebar-admin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarAdmin />
      <main className="flex-1 overflow-y-auto">
        <Card className="m-6">
          <CardContent className="p-6">{children}</CardContent>
        </Card>
      </main>
    </div>
  );
}
