"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Users,
  Briefcase,
  GraduationCap,
  Building,
  Landmark,
} from "lucide-react";

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function Section({ title, icon, children }: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted py-3">
          <CardTitle className="flex items-center space-x-2">
            {icon}
            <span className=" text-base">{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">{children}</CardContent>
      </Card>
    </motion.div>
  );
}

export default function ProfilLengkapSection() {
  return (
    <section className="scroll-mt-[8rem] flex flex-col lg:px-32 px-4 min-h-screen gap-8 py-10">
      <Section title="Data Umum" icon={<MapPin className="w-4 h-4 " />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span>
              <Badge variant="outline">Nama Desa</Badge> Karyamekar
            </span>
            <span>
              <Badge variant="outline">Tahun Pembentukan</Badge> -
            </span>
            <span>
              <Badge variant="outline">Dasar Hukum</Badge> UU No. 9 Tahun 1965
            </span>
            <span>
              <Badge variant="outline">Kode Wilayah</Badge> 32.05.19.2003
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span>
              <Badge variant="outline">Kode Pos</Badge> 44181
            </span>
            <span>
              <Badge variant="outline">Kecamatan</Badge> Cilawu
            </span>
            <span>
              <Badge variant="outline">Kabupaten</Badge> Garut
            </span>
            <span>
              <Badge variant="outline">Provinsi</Badge> Jawa Barat
            </span>
          </div>
        </div>
      </Section>

      <Section title="Data Demografis" icon={<Users className="w-4 h-4 " />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span>
              <Badge variant="outline">Total Penduduk</Badge> 6.061 Jiwa
            </span>
            <span>
              <Badge variant="outline">Jumlah KK</Badge> 2.022
            </span>
            <span>
              <Badge variant="outline">Laki-laki</Badge> 3.073 Jiwa
            </span>
            <span>
              <Badge variant="outline">Perempuan</Badge> 2.978 Jiwa
            </span>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Distribusi Usia:</h3>
            <span>
              <Badge variant="outline">0 - 15 tahun</Badge> 1.796 Jiwa
            </span>
            <span>
              <Badge variant="outline">15 - 65 tahun</Badge> 5.046 Jiwa
            </span>
            <span>
              <Badge variant="outline">65+ tahun</Badge> 948 Jiwa
            </span>
          </div>
        </div>
      </Section>

      <Section
        title="Ekonomi dan Pekerjaan"
        icon={<Briefcase className="w-4 h-4 " />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Pekerjaan Utama:</h3>
            <ul className="list-disc list-inside">
              <li>Wiraswasta/pedagang: 683 orang</li>
              <li>Petani: 43 orang</li>
              <li>Peternak: 68 orang</li>
              <li>PNS: 36 orang</li>
              <li>Swasta: 37 orang</li>
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold mb-2">Data Keuangan Desa:</h3>
            <span>
              <Badge variant="outline">Pendapatan Asli Desa</Badge> Rp.
              8.000.000
            </span>
            <span>
              <Badge variant="outline">ADD</Badge> Rp. 530.694.233
            </span>
            <span>
              <Badge variant="outline">Bantuan Pemerintah</Badge> Rp
              1.274.478.000
            </span>
            <span>
              <Badge variant="outline">Belanja Desa</Badge> Rp. 2.000.861.415
            </span>
          </div>
        </div>
      </Section>

      <Section
        title="Tingkat Pendidikan"
        icon={<GraduationCap className="w-4 h-4 " />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Pendidikan Umum:</h3>
            <ul className="list-disc list-inside">
              <li>SD/sederajat: 3.951 orang</li>
              <li>SMP: 581 orang</li>
              <li>SMA/SMU: 370 orang</li>
              <li>Akademi/D1-D3: 34 orang</li>
              <li>Sarjana: 35 orang</li>
              <li>Pascasarjana: 3 orang</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Pendidikan Khusus:</h3>
            <ul className="list-disc list-inside">
              <li>Sekolah Luar Biasa: 1 orang</li>
            </ul>
            <h3 className="font-semibold mt-4 mb-2">Tidak Sekolah:</h3>
            <ul className="list-disc list-inside">
              <li>Tidak lulus: 155 orang</li>
              <li>Tidak bersekolah: 145 orang</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Infrastruktur" icon={<Building className="w-4 h-4 " />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Kesehatan:</h3>
            <p>UKBM (posyandu, polindes): 10 buah</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Pendidikan:</h3>
            <ul className="list-disc list-inside">
              <li>Perpustakaan Desa: 1 buah</li>
              <li>Gedung PAUD: Ada</li>
              <li>Gedung TK/PAUD: 8 buah</li>
              <li>Gedung SD: 3 buah</li>
            </ul>
          </div>
        </div>
        <Separator className="my-4" />
        <div>
          <h3 className="font-semibold mb-2">Ibadah:</h3>
          <ul className="list-disc list-inside">
            <li>Mesjid: 9 buah</li>
            <li>Mushola: 16 buah</li>
          </ul>
        </div>
      </Section>

      <Section
        title="Lembaga Kemasyarakatan"
        icon={<Landmark className="w-4 h-4 " />}
      >
        <ul className="list-disc list-inside grid grid-cols-1 md:grid-cols-2 gap-2">
          <li>
            <Badge variant="outline">LPM</Badge> 1 pengurus, 7 anggota
          </li>
          <li>
            <Badge variant="outline">TP PKK</Badge> 1 pengurus, 64 anggota
          </li>
          <li>
            <Badge variant="outline">Karang Taruna</Badge> 2 pengurus, 7 anggota
          </li>
          <li>
            <Badge variant="outline">RT/RW</Badge> 46 RT, 12 RW
          </li>
        </ul>
      </Section>
    </section>
  );
}
