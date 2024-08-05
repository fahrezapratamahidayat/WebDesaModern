'use client'
import MainLayout from "@/components/layouts/main-layout";
import HeroSection from "@/components/pages/hero-page";
import Header from "@/components/headers/admin-header";
import AboutSection from "@/components/pages/about-page";
import GallerySection from "@/components/pages/gallery-page";
import KegiatanSection from "@/components/pages/kegiatan-page";
import ArtikelDesaSection from "@/components/pages/artikel-page";
import KontakDesaSection from "@/components/pages/kontak-page";
import FooterSection from "@/components/pages/footer-page";
import LayananDesaSection from "@/components/pages/layanan-page";
import UmkmSection from "@/components/pages/umkm-section-page";

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
