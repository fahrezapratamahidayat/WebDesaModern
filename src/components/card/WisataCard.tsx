"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useAnimation,
} from "framer-motion";
import Image from "next/image";

interface WisataDesaCardProps {
  nama: string;
  deskripsi: string;
  lokasi: string;
  alamat: string;
  telepon: string;
  email?: string;
  website?: string;
  GambarWisataGaleri: {
    id: string;
    wisataDesaId: string;
    url: string;
    keterangan?: string;
    createdAt: Date;
  }[];
}

export default function WisataDesaCard({
  nama,
  deskripsi,
  lokasi,
  alamat,
  telepon,
  email,
  website,
  GambarWisataGaleri,
}: WisataDesaCardProps) {
  const { scrollYProgress, scrollY } = useScroll();
  const controls = useAnimation();
  const [visible, setVisible] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", async (current) => {
    if (current > 0.87) {
      setVisible(true);
      await controls.start("visible");
    } else {
      setVisible(false);
      await controls.start("hidden");
    }
    setSticky(current > 0.9);
    setIsSticky(current < 1.3);
  });
  useMotionValueEvent(scrollYProgress, "change", (current) => {});

  return (
    <div
      id={`${nama}`}
      className="flex lg:flex-row flex-col justify-between w-full mt-20 gap-6 overflow-visible "
    >
      <div className="w-full lg:w-1/2">
        <div
          className={`flex flex-col gap-y-6 ${
            isSticky ? "sticky top-32 z-30 transition" : ""
          }`}
        >
          <div className="flex flex-col gap-6">
            <h2 className="font-semibold text-balance tracking-tighter text-2xl">
              {nama}
            </h2>
            <p className="text-sm text-muted-foreground leading-snug text-justify">
              {deskripsi}
            </p>
            <div className="">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1 * 0.2 }}
                className="flex items-center py-4 border-b mt-6"
              >
                <span className="text-sm text-muted-foreground">Lokasi</span>
                <span className="ml-auto text-sm text-balance">{lokasi}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 2 * 0.2 }}
                className="flex items-center py-4 border-b"
              >
                <span className="text-sm text-muted-foreground">Alamat</span>
                <span className="ml-auto text-sm text-balance">{alamat}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 3 * 0.2 }}
                className="flex items-center py-4 border-b"
              >
                <span className="text-sm text-muted-foreground">Telepon</span>
                <span className="ml-auto text-sm text-balance">{telepon}</span>
              </motion.div>
              {email && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 4 * 0.2 }}
                  className="flex items-center py-4 border-b"
                >
                  <span className="text-sm text-muted-foreground">Email</span>
                  <span className="ml-auto text-sm text-balance">{email}</span>
                </motion.div>
              )}
              {website && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 5 * 0.2 }}
                  className="flex items-center py-4 border-b"
                >
                  <span className="text-sm text-muted-foreground">
                    Kunjungi Situs
                  </span>
                  <span className="ml-auto text-sm text-balance">
                    <Link target="_blank" href={website}>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={`flex flex-col lg:w-1/2 gap-y-6`}>
        <div className="relative flex flex-col gap-8">
          {GambarWisataGaleri.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index + 1) * 0.2 }}
              className="w-full h-[500px]"
            >
              <Image
                src={`http://localhost:3000${image.url}`}
                alt={image.keterangan || `gambar${index + 1}`}
                className="object-cover w-full h-full rounded-md"
                height={800}
                width={800}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}