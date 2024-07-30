import Image from "next/image";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "@/components/ui/button";

export default function AboutSection() {
  return (
    <section
      id="profil"
      className="flex flex-col lg:px-32 px-4 min-h-screen gap-4 mt-96 lg:mt-0 py-12 md:py-20"
    >
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <img
              src="https://plus.unsplash.com/premium_photo-1694475313748-bbd389dabcf4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={500}
              height={500}
              alt="Desa Karyamekar"
              className="rounded-lg w-[500px] h-[500px] object-cover"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">
              Profil Desa Karyamekar
            </h1>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Informasi Umum</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground my-6 ml-6 [&>li]:mt-2 [&>li]:text-sm">
                <li>Nama Desa: Karyamekar</li>
                <li>Kecamatan: Cilawu</li>
                <li>Kabupaten: Garut</li>
                <li>Provinsi: Jawa Barat</li>
                <li>Kode Pos: 44181</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Data Geografis</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground my-6 ml-6 [&>li]:mt-2 [&>li]:text-sm">
                <li>Luas Wilayah: 237.692 ha</li>
                <li>Jarak dari Pusat Pemerintahan Kecamatan: 1 Km</li>
                <li>Jarak dari Pusat Pemerintahan Kota: 10 Km</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Demografi</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground my-6 ml-6 [&>li]:mt-2 [&>li]:text-sm">
                <li>Jumlah Penduduk: 6.061 Jiwa</li>
                <li>Jumlah Kepala Keluarga: 2022 KK</li>
                <li>Laki-laki: 3.073 Jiwa</li>
                <li>Perempuan: 2.978 Jiwa</li>
              </ul>
            </div>
            <Link
              href="/profil-lengkap"
              className={buttonVariants({ variant: "link" })}
            >
              Lihat Profil Lengkap
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
