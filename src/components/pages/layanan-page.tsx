import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { FileText, Users, Briefcase, Home, ChevronRight } from "lucide-react";

export default function LayananDesaSection() {
  const layananDesa = [
    {
      icon: <FileText className="w-10 h-10" />,
      title: "Administrasi Kependudukan",
      description: "Layanan pembuatan KTP, KK, dan surat keterangan lainnya.",
      badge: "Umum",
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Bantuan Sosial",
      description: "Informasi dan pendaftaran program bantuan sosial desa.",
      badge: "Sosial",
    },
    {
      icon: <Briefcase className="w-10 h-10" />,
      title: "UMKM & Koperasi",
      description: "Dukungan dan pembinaan untuk UMKM dan koperasi desa.",
      badge: "Ekonomi",
    },
    {
      icon: <Home className="w-10 h-10" />,
      title: "Perizinan Bangunan",
      description: "Layanan perizinan untuk pembangunan dan renovasi.",
      badge: "Infrastruktur",
    },
  ];

  return (
    <section id="layanan" className="bg-background py-16 lg:px-32 px-6">
      <div className="mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-8">
          Layanan Desa Karyamekar
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Kami menyediakan berbagai layanan untuk memenuhi kebutuhan warga desa.
          Berikut adalah beberapa layanan utama yang dapat kami berikan.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {layananDesa.map((layanan, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <div className="mb-4 flex justify-center">{layanan.icon}</div>
                <CardTitle className="text-xl text-center mb-2">
                  {layanan.title}
                </CardTitle>
                <Badge className="mx-auto text-white">{layanan.badge}</Badge>
              </CardHeader>
              <CardContent className="text-center flex-grow">
                <p className="text-muted-foreground">{layanan.description}</p>
              </CardContent>
              <div className="p-4 mt-auto">
                <Button variant="outline" className="w-full text-white">
                  Detail Layanan
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="text-white">
            Lihat Semua Layanan
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
