"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AlignRight } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

import {
  useScroll,
  useMotionValueEvent,
  motion,
  AnimatePresence,
} from "framer-motion";

export default function Header() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("beranda");

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() <= 0.005) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
      if (current < 0.006758633459864828) setActiveSection("beranda");
      else if (current < 0.14998611239700027) setActiveSection("profil");
      else if (current < 0.21785019905564298) setActiveSection("galeri");
      else if (current < 0.55) setActiveSection("umkm");
      else if (current < 0.8052032219238959) setActiveSection("kegiatan");
      else if (current < 0.8817702064623646) setActiveSection("artikel");
      else setActiveSection("kontak");
    }
  });

  const navLinks = [
    { href: "#beranda", label: "Beranda" },
    { href: "#profil", label: "Profil" },
    { href: "#galeri", label: "Galeri" },
    { href: "#umkm", label: "UMKM" },
    { href: "#kegiatan", label: "Kegiatan" },
    { href: "#artikel", label: "Artikel" },
    { href: "#kontak", label: "Kontak" },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.header
        className={`bg-white border border-b border-border sticky top-0 z-30 flex h-14 items-center gap-4`}
      >
        <div className="flex items-center justify-between w-full lg:mx-32 mx-6">
          <Link href={"#beranda"} className="text-base text-balance font-bold">
            Karyamekar
          </Link>
          <nav className="hidden gap-x-6 items-center lg:flex">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-semibold hover:text-primary transition-all duration-300 ${
                  activeSection === href.slice(1)
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <AlignRight className="h-4 w-4" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="sm:max-w-sm">
              <nav className="flex flex-col gap-y-6">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`text-sm hover:text-primary transition-all duration-300  ${
                      activeSection === href.slice(1)
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </motion.header>
    </AnimatePresence>
  );
}
