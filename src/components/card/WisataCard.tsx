"use client";;
import { useState } from "react";
import { MapPin, Phone, Mail, Globe, Instagram, Facebook, Twitter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface WisataDesaCardProps {
  nama: string;
  deskripsi: string;
  lokasi: string;
  alamat: string;
  telepon: string;
  email?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  GambarWisataGaleri: {
    id: string;
    wisataDesaId: string;
    blob: string;
    keterangan?: string;
    createdAt: Date;
  }[];
}

export default function WisataDesaCard({
  nama,
  deskripsi,
  lokasi,
  alamat,
  telepon,
  email,
  website,
  instagram,
  facebook,
  twitter,
  GambarWisataGaleri,
}: WisataDesaCardProps) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <Card className="w-full mt-8 overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{nama.charAt(0).toUpperCase() + nama.slice(1)}</CardTitle>
        <Badge variant="secondary" className="mt-2">
          {lokasi}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Carousel className="w-full max-w-xs mx-auto">
              <CarouselContent>
                {GambarWisataGaleri.map((image, index) => (
                  <CarouselItem key={image.id}>
                    <div className="relative aspect-square">
                      <Image
                        src={`data:image/jpeg;base64,${image.blob}`}
                        alt={image.keterangan || `Gambar ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{deskripsi}</p>
            <div className="space-y-2">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{alamat}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">{telepon}</span>
              </div>
              {email && (
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">{email}</span>
                </div>
              )}
              {website && (
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  <Link href={website} target="_blank" className="text-sm text-blue-500 hover:underline">
                    {website}
                  </Link>
                </div>
              )}
            </div>
            <div className="flex space-x-2 mt-4">
              {instagram && (
                <Button variant="outline" size="icon" asChild>
                  <Link href={instagram} target="_blank">
                    <Instagram className="w-4 h-4" />
                  </Link>
                </Button>
              )}
              {facebook && (
                <Button variant="outline" size="icon" asChild>
                  <Link href={facebook} target="_blank">
                    <Facebook className="w-4 h-4" />
                  </Link>
                </Button>
              )}
              {twitter && (
                <Button variant="outline" size="icon" asChild>
                  <Link href={twitter} target="_blank">
                    <Twitter className="w-4 h-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}