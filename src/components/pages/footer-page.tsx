import React from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Facebook, Instagram, Twitter, Youtube, Send } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="bg-background text-foreground">
      <div className="scroll-mt-[2rem] flex flex-col lg:px-32 px-6 py-12 gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Kolom 1: Tentang Desa */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Desa Karyamekar</h3>
            <p className="text-sm text-muted-foreground">
              Desa Karyamekar adalah desa yang terletak di Kecamatan Cilawu 
              Kabupaten Garut, yang terus berkembang dan berkomitmen untuk
              kesejahteraan masyarakat.
            </p>
          </div>

          {/* Kolom 2: Tautan Cepat */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:underline">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#profil" className="text-sm hover:underline">
                  Profil Desa
                </a>
              </li>
              <li>
                <a href="#layanan" className="text-sm hover:underline">
                  Layanan
                </a>
              </li>
              <li>
                <a href="#kegiatan" className="text-sm hover:underline">
                  Berita
                </a>
              </li>
              <li>
                <a href="#kontak" className="text-sm hover:underline">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kontak */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <address className="text-sm text-muted-foreground not-italic">
              Jl. Desa Karyamekar No. 123
              <br />
              Kabupaten Garut
              <br />
              Provinsi Jawa Barat
              <br />
              <br />
              Telepon: (021) 1234-5678
              <br />
              Email: karyamekar.cilawu@gmail.com
            </address>
          </div>

          {/* Kolom 4: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Berlangganan Newsletter
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Dapatkan informasi terbaru tentang Desa Karyamekar.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Alamat Email"
                className="max-w-[200px]"
              />
              <Button size="sm" className="">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2024 Desa Karyamekar. Hak Cipta Dilindungi.
          </p>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon">
              <Facebook className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Instagram className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Twitter className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Youtube className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
