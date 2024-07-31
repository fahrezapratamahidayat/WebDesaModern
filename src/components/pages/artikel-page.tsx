import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ChevronRight, Calendar, User, Filter } from "lucide-react";

export default function ArtikelDesaSection() {
  const artikelDesa = [
    {
      judul: "Peningkatan Infrastruktur Desa Karyamekar",
      kategori: "Pembangunan",
      tanggal: "5 Agustus 2024",
      penulis: "Admin Desa",
      ringkasan:
        "Desa Karyamekar telah memulai proyek peningkatan infrastruktur yang meliputi perbaikan jalan dan sistem drainase.",
    },
    {
      judul: "Prestasi Pemuda Desa dalam Kompetisi Teknologi",
      kategori: "Pendidikan",
      tanggal: "12 Juli 2024",
      penulis: "Tim Humas",
      ringkasan:
        "Tiga pemuda Desa Karyamekar berhasil meraih juara dalam kompetisi teknologi tingkat provinsi.",
    },
    {
      judul: "Program Pemberdayaan UMKM Desa Karyamekar",
      kategori: "Ekonomi",
      tanggal: "20 Juni 2024",
      penulis: "Sekretaris Desa",
      ringkasan:
        "Pemerintah Desa Karyamekar meluncurkan program pemberdayaan UMKM untuk meningkatkan ekonomi lokal.",
    },
  ];

  return (
    <section id="artikel" className="container mx-auto py-12">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight mb-8">
          Artikel Desa Karyamekar
        </h1>
        <Button variant="outline" size="icon">
          <Filter className="w-4 h-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artikelDesa.map((artikel, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary">{artikel.kategori}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{artikel.tanggal}</span>
                </div>
              </div>
              <CardTitle className="text-xl">{artikel.judul}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{artikel.ringkasan}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center mt-auto">
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="w-4 h-4 mr-1" />
                <span>{artikel.penulis}</span>
              </div>
              <Button variant="ghost" className="text-primary">
                Baca Selengkapnya <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
