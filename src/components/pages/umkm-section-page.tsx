"use client";;
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, useAnimation } from "framer-motion";
export default function UmkmSection() {
  const { scrollYProgress, scrollY } = useScroll();
  const controls = useAnimation();
  const [visible, setVisible] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", async (current) => {
    if (current > 0.87) {
      setVisible(true);
      await controls.start("visible");
    } else {
      setVisible(false);
      await controls.start("hidden");
    }
    setSticky(current > 0.9);
    setIsSticky(current < 1.3);
  });
  useMotionValueEvent(scrollYProgress, "change", (current) => {});
  return (
    <section
      id="umkm"
      className="scroll-mt-[2rem] flex flex-col lg:px-32 px-6 gap-4 mt-64 lg:mt-0 overflow-visible "
    >
      <h1 className="text-balance text-3xl font-bold tracking-tight">
        UMKM Desa Karyamekar
      </h1>
      <div className="flex lg:flex-row flex-col justify-between w-full gap-6 overflow-visible ">
        <div className="w-full lg:w-1>/2">
          <div
            className={`flex flex-col gap-y-6 ${
              isSticky ? "sticky top-32 z-30 transition" : ""
            }`}
          >
            <div className="flex flex-col gap-6">
              <h2 className="font-semibold text-balance tracking-tighter text-2xl">
                Cuankie Lezat
              </h2>
              <p className="text-sm text-muted-foreground leading-snug text-balance">
                Cuankie Lezat adalah usaha mikro kecil dan menengah (UMKM) yang
                bergerak di bidang kuliner, khususnya dalam pembuatan dan
                penjualan cuankie. Cuankie adalah hidangan khas Bandung yang
                terdiri dari bakso, tahu, dan pangsit, disajikan dengan kuah
                kaldu yang gurih dan segar. Kami berkomitmen untuk menyediakan
                cuankie yang lezat, higienis, dan terjangkau bagi pelanggan
                kami.
              </p>
              <div className="">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1 * 0.2 }}
                  className="flex items-center py-4 border-b mt-6"
                >
                  <span className="text-sm text-muted-foreground">
                    Jenis Usaha
                  </span>
                  <span className="ml-auto text-sm text-balance">
                    Kuliner / Makanan
                  </span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 2 * 0.2 }}
                  className="flex items-center py-4 border-b"
                >
                  <span className="text-sm text-muted-foreground">
                    Produk Utama
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Keunggulan
                  </span>
                  <div className="flex flex-col ml-auto">
                    <span className="text-sm text-balance">
                      Bahan Berkualitas
                    </span>
                    <span className="text-sm text-balance">Rasa Autentik</span>
                    <span className="text-sm text-balance">
                      Harga Terjangkau
                    </span>
                    <span className="text-sm text-balance">
                      Pelayanan Ramah
                    </span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 3 * 0.2 }}
                  className="flex py-4 border-b"
                >
                  <span className="text-sm text-muted-foreground">
                    Keunggulan
                  </span>
                  <div className="flex flex-col ml-auto">
                    <span className="text-sm text-balance">
                      Bahan Berkualitas
                    </span>
                    <span className="text-sm text-balance">Rasa Autentik</span>
                    <span className="text-sm text-balance">
                      Harga Terjangkau
                    </span>
                    <span className="text-sm text-balance">
                      Pelayanan Ramah
                    </span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 3 * 0.2 }}
                  className="flex items-center py-4 border-b"
                >
                  <span className="text-sm text-muted-foreground">Lokasi</span>
                  <span className="ml-auto text-sm text-balance">
                    Jl. Raya No. 123, Bandung, Jawa Barat
                  </span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 4 * 0.2 }}
                  className="flex items-center py-4 border-b"
                >
                  <span className="text-sm text-muted-foreground">
                    Kunjungi Situs
                  </span>
                  <span className="ml-auto text-sm text-balance">
                    <Link
                      target="_blank"
                      href={"https://todo-next-public.vercel.app"}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        <div className={`flex flex-col lg:w-1/2 gap-y-6`}>
          <div className="relative flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1 * 0.2 }}
              className="w-full h-[500px]"
            >
              <img
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWfZi9eOEv-P2yIyxwGc4NFmHoippxNYrtQA&s"
                }
                alt="gambar1"
                className="w-full h-full rounded-lg object-cover"
                height={800}
                width={800}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1 * 0.2 }}
              className="w-full h-[500px]"
            >
              <img
                src={
                  "https://wiratech.co.id/wp-content/uploads/2024/01/Bakso-Cuanki-Top.jpg"
                }
                alt="gambar1"
                className="w-full h-full rounded-lg object-cover"
                height={800}
                width={800}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1 * 0.2 }}
              className="w-full h-[500px]"
            >
              <img
                src={
                  "https://down-id.img.susercontent.com/file/57885976ef7aa293b5da8b68c18496a7"
                }
                alt="gambar2"
                className="w-full h-full rounded-lg object-cover"
                height={800}
                width={800}
              />
            </motion.div>
          </div>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col justify-between w-full gap-6 overflow-visible mt-20">
        <div className="w-full lg:w-1/2">
          <div
            className={`flex flex-col gap-y-6 ${
              isSticky ? "sticky top-32 z-30 transition" : ""
            }`}
          >
            <div className="flex flex-col gap-6">
              <h2 className="font-semibold text-balance tracking-tighter text-2xl">
                Es Pisang Cihuyyy
              </h2>
              <p className="text-sm text-muted-foreground leading-snug text-balance">
                Es Pisang Cihuyyy adalah usaha mikro kecil dan menengah (UMKM)
                yang bergerak di bidang kuliner, khususnya dalam pembuatan dan
                penjualan cuankie. Cuankie adalah hidangan khas Bandung yang
                terdiri dari bakso, tahu, dan pangsit, disajikan dengan kuah
                kaldu yang gurih dan segar. Kami berkomitmen untuk menyediakan
                cuankie yang lezat, higienis, dan terjangkau bagi pelanggan
                kami.
              </p>
              <div className="">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1 * 0.2 }}
                  className="flex items-center py-4 border-b mt-6"
                >
                  <span className="text-sm text-muted-foreground">
                    Jenis Usaha
                  </span>
                  <span className="ml-auto text-sm text-balance">
                    Kuliner / Makanan
                  </span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 2 * 0.2 }}
                  className="flex items-center py-4 border-b"
                >
                  <span className="text-sm text-muted-foreground">
                    Produk Utama
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Keunggulan
                  </span>
                  <div className="flex flex-col ml-auto">
                    <span className="text-sm text-balance">
                      Bahan Berkualitas
                    </span>
                    <span className="text-sm text-balance">Rasa Autentik</span>
                    <span className="text-sm text-balance">
                      Harga Terjangkau
                    </span>
                    <span className="text-sm text-balance">
                      Pelayanan Ramah
                    </span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 3 * 0.2 }}
                  className="flex py-4 border-b"
                >
                  <span className="text-sm text-muted-foreground">
                    Keunggulan
                  </span>
                  <div className="flex flex-col ml-auto">
                    <span className="text-sm text-balance">
                      Bahan Berkualitas
                    </span>
                    <span className="text-sm text-balance">Rasa Autentik</span>
                    <span className="text-sm text-balance">
                      Harga Terjangkau
                    </span>
                    <span className="text-sm text-balance">
                      Pelayanan Ramah
                    </span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 3 * 0.2 }}
                  className="flex items-center py-4 border-b"
                >
                  <span className="text-sm text-muted-foreground">Lokasi</span>
                  <span className="ml-auto text-sm text-balance">
                    Jl. Raya No. 123, Bandung, Jawa Barat
                  </span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 4 * 0.2 }}
                  className="flex items-center py-4 border-b"
                >
                  <span className="text-sm text-muted-foreground">
                    Kunjungi Situs
                  </span>
                  <span className="ml-auto text-sm text-balance">
                    <Link
                      target="_blank"
                      href={"https://todo-next-public.vercel.app"}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        <div className={`flex flex-col lg:w-1/2 gap-y-6`}>
          <div className="relative flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1 * 0.2 }}
              className="w-full h-[500px]"
            >
              <img
                src={
                  "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/2715fa24-de96-40c0-9aff-b0eb5e85d0ee_Go-Biz_20210319_182000.jpeg"
                }
                alt="gambar1"
                className="w-full h-full rounded-lg object-cover"
                height={800}
                width={800}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1 * 0.2 }}
              className="w-full h-[500px]"
            >
              <img
                src={
                  "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/cb2c00f1-2206-4ed4-9a88-c3a74ad05ec1_Go-Biz_20210319_182250.jpeg"
                }
                alt="gambar1"
                className="w-full h-full rounded-lg object-cover"
                height={800}
                width={800}
              />
            </motion.div>
            {/* <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1 * 0.2 }}
              className="w-full h-full"
            >
              <Image
                src={"/todoImage3.png"}
                alt="gambar2"
                className="w-full h-full rounded-lg object-cover"
                height={800}
                width={800}
              />
            </motion.div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
