import React from "react";
import { Badge } from "../ui/badge";
import { Filter, User, MapPin, Calendar, Clock } from "lucide-react";
import { Button } from "../ui/button";
import useSWR from "swr";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";

interface Kegiatan {
  id: number;
  createdAt: string;
  updatedAt: string;
  nama: string;
  jenis: string;
  tanggal: string;
  waktu: string;
  lokasi: string;
  dibuat: string;
  postedBy: string;
  penulisId: number;
}

export default function KegiatanSection() {
  const fetcher = async () => {
    const res = await axios.get("http://localhost:3000/api/kegiatan");
    return res.data.data;
  };
  const { data, isLoading, error } = useSWR("/api/kegiatan", fetcher);
  if (isLoading) return <div className="">loading</div>;
  if (error) return <div className="">error</div>;
  if (!data) return <div className="">Data belum tersedia</div>;
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
      {data.map((kegiatan: Kegiatan, index: number) => (
        <div
          key={index}
          className="group flex flex-col p-6 rounded-lg bg-card hover:bg-accent transition duration-300 shadow-sm hover:shadow-md"
        >
          <h2 className="text-2xl font-semibold tracking-tight text-card-foreground mb-2">
            {kegiatan.nama}
          </h2>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="default" className="text-white">
              {kegiatan.jenis}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-1" />
              <span>
                {format(parseISO(kegiatan.tanggal), "d MMMM yyyy", {
                  locale: id,
                })}
              </span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" />
              <span>{kegiatan.waktu} - selesai</span>
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
            <p>
              Dibuat:{" "}
              {format(parseISO(kegiatan.dibuat), "d MMMM yyyy", {
                locale: id,
              })}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
