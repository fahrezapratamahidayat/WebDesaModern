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
import { ArrowLeft, ArrowRight, GalleryHorizontal, GalleryThumbnails, TentTree ,LogOutIcon, Package2 } from "lucide-react";
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
    {icon: TentTree, label: "Wisata", href: "/admin/wisata"},
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
                  <div
                    className={`inline-flex items-center whitespace-nowrap rounded-md ${pathname === item.href ? "bg-primary text-primary-foreground hover:bg-primary/90" : "hover:bg-primary/50"} h-10 px-4 py-2 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full justify-start  text-sm ${isSidebarOpen ? "" : ""}`}
                  >
                    <item.icon className="h-5 w-5 " />
                    {isSidebarOpen && (
                      <span className="ml-2">{item.label}</span>
                    )}
                  </div>
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
                className={`w-full justify-start  text-sm ${isSidebarOpen ? "" : ""}`}
              >
                <LogOutIcon className="h-5 w-5 " />
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
