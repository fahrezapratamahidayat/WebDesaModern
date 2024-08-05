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
  if (isLoading) return <div className="">loading</div>;
  if (error) return <div className="">error</div>;
  if (!data) return <div className="">Data belum tersedia</div>;
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
    </section>
  );
}
