import SidebarAdmin from "../sidebar/sidebar-admin";
import { HeaderAdmin } from "../headers/header-admin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <SidebarAdmin />
      <div className="flex flex-col sm:py-4 w-full">
        <HeaderAdmin />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
