import Image from "next/image";
import React from "react";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="scroll-m-0 relative overflow-hidden flex h-screen flex-col px-20 items-center justify-center"
    >
      {/* <div className="absolute top-0 left-0 w-full h-full lg:mt-0">
        <Image
          width={800}
          height={800}
          src="/hero-image.jpeg"
          alt=""
          className="w-full h-full"
        />
      </div> */}
      <div className="z-10 flex flex-col items-center justify-center h-full">
        
      </div>
    </section>
  );
}
