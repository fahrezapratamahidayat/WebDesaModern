"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useSWR from "swr";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import { Camera } from "lucide-react"; // Import ikon Camera

export default function GallerySection() {
  const [imageLink, setImageLink] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleImageModal = (link: string) => {
    setImageLink(link);
    setDialogOpen(true);
  };

  const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);
  const { data, isLoading, error } = useSWR("/api/galeri", fetcher);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Skeleton className="w-32 h-32" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-red-500">
          Gagal memuat galeri. Silakan coba lagi nanti.
        </p>
      </div>
    );

  return (
    <section
      id="galeri"
      className="scroll-mt-[2rem] flex flex-col lg:px-32 pb-20 px-4 min-h-screen gap-4 mt-96 lg:mt-0"
    >
      <h1 className="text-3xl font-bold tracking-tight">Galeri Desa</h1>

      {!data || data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Camera className="w-24 h-24 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Belum Ada Foto
          </h2>
          <p className="text-gray-500 max-w-md">
            Saat ini belum ada foto yang ditambahkan ke galeri Desa Karyamekar.
            Kunjungi kembali nanti untuk melihat momen-momen indah dari desa
            kami.
          </p>
        </div>
      ) : (
        <div className="group flex lg:flex-row flex-col lg:items-center lg:px-1 py-6 lg:gap-0 gap-5">
          <div className="grid grid-cols-2 gap-2">
            {data.map((item: any) => (
              <div key={item.id}>
                <Image
                  className="h-full object-cover max-w-full rounded-lg cursor-pointer"
                  src={`http://localhost:3000${item.url}`}
                  alt={item.keterangan}
                  width={500}
                  height={500}
                  onClick={() =>
                    handleImageModal(`http://localhost:3000${item.url}`)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
        <DialogContent className="p-0 bg-transparent border-none h-[500px] w-[800px] max-w-full">
          <div className="">
            <Image
              src={imageLink}
              alt="Foto galeri"
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
