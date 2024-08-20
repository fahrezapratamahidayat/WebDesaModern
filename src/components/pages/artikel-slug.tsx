'use client'
import React from "react";
import useSWR from "swr";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Loader2 } from "lucide-react";

interface Penulis {
  id: number;
  nama: string;
}

type StatusArtikel = "Draft" | "Publikasi" | "Arsip";

interface Artikel {
  id: number;
  createdAt: string;
  updatedAt: string;
  judul: string;
  kategori: string;
  tanggal: string;
  penulisId: number;
  ringkasan: string;
  urlArtikel: string;
  slug: string;
  penulis: Penulis;
  error?: string;
  status: StatusArtikel;
  isi: string;
}

const fetcher = async (url: string) => {
  const res = await axios.get(url);
  return res.data.data;
};

export default function ArtikelDetail({ slug }: { slug: string }) {
    const { data, isLoading, error } = useSWR(`/api/artikel/${slug}`, fetcher);

  if (error) {
    return (
      <div className="container mx-auto py-12 text-center">
        <p className="text-lg text-red-500">
          Terjadi kesalahan saat memuat artikel. Silakan coba lagi nanti.
        </p>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="container mx-auto py-12 flex justify-center items-center">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        <p className="text-lg">Memuat artikel...</p>
      </div>
    );
  }

  return (
    <div className="py-12 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-start mb-4">
            <Badge variant="secondary">{data.kategori}</Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-1" />
              <span>
                {format(parseISO(data.tanggal), "d MMMM yyyy", {
                  locale: id,
                })}
              </span>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold mb-2">
            {data.judul}
          </CardTitle>
          <CardDescription className="flex items-center">
            <Avatar className="w-8 h-8 mr-2">
              <AvatarImage src={""} alt={data.penulis.nama} />
              <AvatarFallback>{data.penulis.nama.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{data.penulis.nama}</span>
          </CardDescription>
        </CardHeader>
        <Separator className="my-4" />
        <CardContent>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: data.isi }}
          />
        </CardContent>
        <CardFooter className="flex justify-between items-center mt-8">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Desa Karyamekar
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}