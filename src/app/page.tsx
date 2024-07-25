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

export default function Home() {
  return (
    <>
    <MainLayout>
      <Header/>
      <HeroSection />
    </MainLayout>
    </>
  );
}
