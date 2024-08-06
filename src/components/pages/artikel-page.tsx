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
import { ChevronRight, Calendar, User, Filter, BookOpen, Loader2 } from "lucide-react";
import axios from "axios";
import useSWR from "swr";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";

interface Penulis {
  id: number;
  nama: string;
}

interface Artikel {
  id: number;
  createdAt: string;
  updatedAt: string;
  judul: string;
  kategori: string;
  tanggal: string;
  penulisId: number;
  ringkasan: string;
  penulis: Penulis;
}

export default function ArtikelDesaSection() {
  const fetcher = async () => {
    const res = await axios.get("http://localhost:3000/api/artikel");
    return res.data.data;
  };

  const { data, isLoading, error } = useSWR("/api/artikel", fetcher);

  if (isLoading)
    return (
      <div className="container mx-auto py-12 flex justify-center items-center">
        <p className="text-lg">Memuat artikel... </p>
        <Loader2 />
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto py-12 flex justify-center items-center">
        <p className="text-lg text-red-500">
          Gagal memuat artikel. Silakan coba lagi nanti.
        </p>
      </div>
    );

  return (
    <section id="artikel" className="container mx-auto py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Artikel Desa Karyamekar
        </h1>
        <Button variant="outline" size="icon">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {!data || data.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-16 text-center">
          <BookOpen className="w-24 h-24 text-gray-400 mb-4" />
          <CardTitle className="text-2xl font-semibold text-gray-700 mb-2">
            Belum Ada Artikel
          </CardTitle>
          <CardContent>
            <p className="text-gray-500 max-w-md">
              Saat ini belum ada artikel yang dipublikasikan di Desa Karyamekar.
              Kunjungi kembali nanti untuk membaca artikel terbaru kami.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((artikel: Artikel, index: number) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{artikel.kategori}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>
                      {format(parseISO(artikel.tanggal), "d MMMM yyyy", {
                        locale: id,
                      })}
                    </span>
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
                  <span>{artikel.penulis.nama}</span>
                </div>
                <Button variant="ghost" className="text-primary">
                  Baca Selengkapnya <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
