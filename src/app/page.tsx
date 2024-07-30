import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import MainLayout from "@/components/layouts/main-layout";
import HeroSection from "@/components/sections/hero-section";
import Header from "@/components/headers/admin-header";
import AboutSection from "@/components/sections/about-section";
import GallerySection from "@/components/sections/gallery-section";
import UmkmSection from "@/components/sections/umkm-section";
import KegiatanSection from "@/components/sections/kegiatan-section";
import ArtikelDesaSection from "@/components/sections/artikel-section";
import KontakDesaSection from "@/components/sections/kontak-section";
import FooterSection from "@/components/sections/footer-section";
import LayananDesaSection from "@/components/sections/layanan-section";

export default function Home() {
  return (
    <>
    <MainLayout>
      <Header/>
      <HeroSection />
      <AboutSection />
      <LayananDesaSection />
      <GallerySection />
      <UmkmSection />
      <KegiatanSection />
      <ArtikelDesaSection />
      <KontakDesaSection />
      <FooterSection />
    </MainLayout>
    </>
  );
}
