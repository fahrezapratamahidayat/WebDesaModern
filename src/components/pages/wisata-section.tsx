import axios from "axios";
import useSWR from "swr";
import UMKMCard from "../card/umkm-card";
import { CalendarIcon, Loader2, Store } from "lucide-react";
import WisataDesaCard from "../card/WisataCard";

export default function WisataSection() {
  const fetcher = async () => {
    const res = await axios.get("http://localhost:3000/api/wisata");
    return res.data.data;
  };
  const { data, isLoading, error } = useSWR("/api/wisata", fetcher);

  if (isLoading)
    return (
      <div className="container mx-auto py-12 flex justify-center items-center">
        <p className="text-lg">Memuat wisata... </p>
        <Loader2 />
      </div>
    );
  if (error)
    return (
      <div className="container mx-auto py-12 flex justify-center items-center">
        <p className="text-lg text-red-500">
          Gagal memuat wisata. Silakan coba lagi nanti.
        </p>
      </div>
    );

  return (
    <section
      id="wisata"
      className="scroll-mt-[2rem] flex flex-col lg:px-32 px-6 gap-6 mt-96 lg:mt-32"
    >
      <h1 className="text-balance text-3xl font-bold tracking-tight">
        Wisata Desa Karyamekar
      </h1>
    {!data || data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <CalendarIcon className="w-24 h-24 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Belum Ada Wisata
          </h2>
          <p className="text-gray-500 max-w-md">
            Saat ini belum ada wisata yang terdaftar di Desa Karyamekar. Silakan
            cek kembali nanti untuk informasi terbaru.
          </p>
        </div>
      ) : (
        data.map((item: any, index: number) => (
          <WisataDesaCard key={item.id} {...item} />
        ))
      )}
    </section>
  );
}
