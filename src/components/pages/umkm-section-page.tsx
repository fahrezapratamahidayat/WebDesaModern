import axios from "axios";
import useSWR from "swr";
import UMKMCard from "../card/umkm-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function UmkmSection() {
  const fetcher = async () => {
    const res = await axios.get("http://localhost:3000/api/umkm");
    return res.data.data;
  };
  const { data, error } = useSWR("/api/umkm", fetcher);

  if (error) return <div>Gagal memuat data UMKM.</div>;
  if (!data) return (
    <div>
      <section
        id="umkm"
        className="scroll-mt-[2rem] flex flex-col lg:px-32 px-6 gap-4 mt-64 lg:mt-0 overflow-visible "
      >
        <Skeleton className="h-6 w-[250px]" />
        <Skeleton className="h-[20px] w-[600px]" />
        <Skeleton className="h-[400px] w-[600px]" />
      </section>
    </div>
  ); 
  return (
    <section
      id="umkm"
      className="scroll-mt-[2rem] flex flex-col lg:px-32 px-6 gap-4 mt-64 lg:mt-0 overflow-visible "
    >
      <h1 className="text-balance text-3xl font-bold tracking-tight">
        UMKM Desa Karyamekar
      </h1>
      {data.map((item: any) => (
        <UMKMCard key={item.id} {...item} />
      ))}
    </section>
  );
}
