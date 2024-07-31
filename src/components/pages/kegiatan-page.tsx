import React from "react";
import { Badge } from "../ui/badge";
import { Filter, User, MapPin, Calendar, Clock } from "lucide-react";
import { Button } from "../ui/button";

export default function KegiatanSection() {
  const kegiatanDesa = [
    {
      nama: "Gotong Royong Membersihkan Sungai",
      jenis: "Lingkungan",
      tanggal: "10 Agustus 2024",
      waktu: "08:00 - 12:00 WIB",
      lokasi: "Sungai Citarum, RT 03/RW 02",
      dibuat: "2024-07-15",
      postedBy: "Admin Desa",
    },
    {
      nama: "Pelatihan Keterampilan Digital",
      jenis: "Pendidikan",
      tanggal: "15-17 September 2024",
      waktu: "09:00 - 15:00 WIB",
      lokasi: "Balai Desa Karyamekar",
      dibuat: "2024-07-01",
      postedBy: "Sekretaris Desa",
    },
    {
      nama: "Festival Budaya Desa",
      jenis: "Budaya",
      tanggal: "1-3 Oktober 2024",
      waktu: "10:00 - 22:00 WIB",
      lokasi: "Lapangan Desa Karyamekar",
      dibuat: "2024-06-20",
      postedBy: "Kepala Desa",
    },
  ];

  return (
    <section
      id="kegiatan"
      className="scroll-mt-[2rem] flex flex-col lg:px-32 px-6 min-h-screen gap-8 mt-96 lg:mt-32"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Kegiatan Desa Karyamekar
        </h1>
        <Button variant="outline" size="icon">
          <Filter className="w-4 h-4" />
        </Button>
      </div>
      {kegiatanDesa.map((kegiatan, index) => (
        <div
          key={index}
          className="group flex flex-col p-6 rounded-lg bg-card hover:bg-accent transition duration-300 shadow-sm hover:shadow-md"
        >
          <h2 className="text-2xl font-semibold tracking-tight text-card-foreground mb-2">
            {kegiatan.nama}
          </h2>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="default">{kegiatan.jenis}</Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{kegiatan.tanggal}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" />
              <span>{kegiatan.waktu}</span>
            </div>
          </div>
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{kegiatan.lokasi}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="w-4 h-4 mr-2" />
            <span>Diposting oleh: {kegiatan.postedBy}</span>
          </div>
          <div className="text-xs text-muted-foreground mt-3">
            <p>Dibuat: {kegiatan.dibuat}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
