import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function KontakDesaSection() {
  return (
    <section id="kontak" className="container mx-auto py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Hubungi Kami</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl mb-4">Informasi Kontak</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-primary" />
              <span>(021) 1234-5678</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-primary" />
              <span>info@desakaryamekar.id</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-primary" />
              <span>Jl. Desa Karyamekar No. 123, Kabupaten Sukamaju</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl mb-4">Kirim Pesan</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Input placeholder="Nama Lengkap" />
              <Input type="email" placeholder="Alamat Email" />
              <Input placeholder="Subjek" />
              <Textarea placeholder="Pesan Anda" className="h-32" />
              <Button className="w-full text-white">
                Kirim Pesan
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Separator className="my-12" />
      <Card>
        <CardHeader>
          <CardTitle className="text-xl mb-4">Lokasi Kami</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Placeholder untuk peta, Anda bisa menggantinya dengan komponen peta yang sesuai */}
          <div className="w-full h-64 bg-muted rounded-md flex items-center justify-center">
            <span className="text-muted-foreground">Peta Lokasi Desa</span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
