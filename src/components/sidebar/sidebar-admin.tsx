'use client'
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";

import {
  HomeIcon,
  FileTextIcon,
  CalendarIcon,
} from "@radix-ui/react-icons";
import { LogOut } from "lucide-react";

export default function SidebarAdmin() {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { icon: HomeIcon, label: "Dashboard", href: "/admin" },
    { icon: FileTextIcon, label: "Artikel", href: "/admin/artikel" },
    { icon: CalendarIcon, label: "Kegiatan", href: "/admin/kegiatan" },
  ];

  return (
      <aside
        className={`bg-white ${isSidebarOpen ? "w-64" : "w-20"} transition-all duration-300 ease-in-out`}
      >
        <ScrollArea className="h-full">
          <div className="p-4">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? "<<" : ">>"}
            </Button>
          </div>
          <nav className="space-y-1 p-4 flex flex-col">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={
                    pathname === item.href ? "secondary" : "ghost"
                  }
                  className={`w-full justify-start ${isSidebarOpen ? "" : "justify-center"}`}
                >
                  <item.icon className="h-5 w-5" />
                  {isSidebarOpen && <span className="ml-2">{item.label}</span>}
                </Button>
              </Link>
            ))}
          </nav>
          <div className="p-4 mt-auto">
            <Button
              variant="ghost"
              className={`w-full justify-start ${isSidebarOpen ? "" : "justify-center"}`}
            >
              <LogOut className="h-5 w-5" />
              {isSidebarOpen && <span className="ml-2">Keluar</span>}
            </Button>
          </div>
        </ScrollArea>
      </aside>
  );
}
