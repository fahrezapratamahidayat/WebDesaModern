"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  FileTextIcon,
  CalendarIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { ArrowLeft, ArrowRight, GalleryHorizontal, GalleryThumbnails, LogOutIcon, Package2 } from "lucide-react";
import { signOut } from "next-auth/react";

export default function SidebarAdmin() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { icon: Package2, label: "Dashboard", href: "/admin/dashboard" },
    { icon: FileTextIcon, label: "Artikel", href: "/admin/artikel" },
    { icon: CalendarIcon, label: "Kegiatan", href: "/admin/kegiatan" },
    { icon: HamburgerMenuIcon, label: "UMKM", href: "/admin/umkm" },
    { icon: GalleryThumbnails, label: "Galeri", href: "/admin/galeri" },
  ];

  return (
    <aside
      className={`relative bg-muted ${isSidebarOpen ? "w-64" : "w-20"} h-full transition-all duration-300 ease-in-out hidden w flex-col border-r bg-background sm:flex`}
    >
      <div className="absolute top-0 w-full h-full right-0 flex justify-center items-center translate-x-1/2">
        <Button
          variant="ghost"
          size={"icon"}
          className="flex items-center justify-center rounded-full bg-muted/90"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <ArrowRight className="h-5 w-5" />
          ) : (
            <ArrowLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
      <nav className="flex flex-col gap-4 px-2 sm:py-5">
        {menuItems.map((item) => (
          <TooltipProvider key={item.label}>
            <Tooltip>
              <TooltipTrigger>
                {" "}
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={pathname === item.href ? "default" : "ghost"}
                    className={`w-full justify-start text-white text-sm ${isSidebarOpen ? "" : ""}`}
                  >
                    <item.icon className="h-5 w-5 text-white" />
                    {isSidebarOpen && (
                      <span className="ml-2">{item.label}</span>
                    )}
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {" "}
              <Button
                onClick={() => signOut()}
                variant={"ghost"}
                className={`w-full justify-start text-white text-sm ${isSidebarOpen ? "" : ""}`}
              >
                <LogOutIcon className="h-5 w-5 text-white" />
                {isSidebarOpen && <span className="ml-2">Log out</span>}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Log out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}
