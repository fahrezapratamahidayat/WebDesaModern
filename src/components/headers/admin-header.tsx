"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AlignRight } from "lucide-react";
import { useState } from "react";
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

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() <= 0.1) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });
  return (
    <AnimatePresence mode="wait">
      <motion.header
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b backdrop-blur-lg"
      >
        <div className="flex items-center justify-between w-full lg:mx-32 mx-6">
          <Link href={"/"} className="text-base text-balance font-bold">
            Karya Mekar
          </Link>
          <nav className="hidden gap-x-6 items-center lg:flex">
            <Link href={"/"} className="text-sm text-balance">
              Beranda
            </Link>
            <Link href={"/#about"} className="text-sm text-balance">
              Profil
            </Link>
            <Link href={"/#work"} className="text-sm text-balance">
              Galeri
            </Link>
            <Link href={"/#skills"} className="text-sm text-balance">
              UMKM
            </Link>
            <Link href={"/#projects"} className="text-sm text-balance">
              Kegiatan
            </Link>
            <Link href={"/#blog"} className="text-sm text-balance">
              Artikel
            </Link>
            <Link href={"/Kontak"} className="text-sm text-balance">
              Kontak
            </Link>
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
                <Link href={"/"} className="text-sm text-balance">
                  Beranda
                </Link>
                <Link href={"/#about"} className="text-sm text-balance">
                  Profil
                </Link>
                <Link href={"/#work"} className="text-sm text-balance">
                  Galeri
                </Link>
                <Link href={"/#skills"} className="text-sm text-balance">
                  UMKM
                </Link>
                <Link href={"/#projects"} className="text-sm text-balance">
                  Kegiatan
                </Link>
                <Link href={"/#blog"} className="text-sm text-balance">
                  Artikel
                </Link>
                <Link href={"/Kontak"} className="text-sm text-balance">
                  Kontak
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </motion.header>
      );
    </AnimatePresence>
  );
}
