import Image from "next/image";
import React from "react";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="scroll-m-0 relative overflow-hidden flex h-screen flex-col px-20 items-center justify-center"
    >
      <div className="absolute top-0 left-0 w-full h-full lg:mt-0">
        <Image
          width={800}
          height={800}
          src={`/hero-image1.jpeg`}
          alt=""
          className="w-full h-full object-cover filter brightness-50"
        />
      </div>
      <div className="z-10 flex flex-col items-center gap-1">
        <h3 className="lg:text-xl text-lg font-medium tracking-tighter text-white">
          Selamat Datang di Website Resmi
        </h3>
        <h1 className=" text-2xl font-bold tracking-tight lg:text-5xl text-white">
          Desa Karyamekar Cilawu
        </h1>
        <h3 className="lg:text-4xl font-bold tracking-tighter text-white">
          Kabupaten Garut
        </h3>
      </div>
    </section>
  );
}
