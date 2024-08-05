"use client";;
import axios from "axios";
import AdminLayout from "../layouts/admin-layout";
import useSWR from "swr";
import SidebarSkeleton from "../skeletons/sidebar";
import { Card, CardContent } from "../ui/card";
import TableArtikelSkeleton from "../skeletons/table";
import TableKegiatanDesa, { columns } from "../tables/table-kegiatan";

export default function AdminKegiatanPage() {

  const fetcher = async () => {
    const response = await axios.get("/api/kegiatan");
    return response.data.data;
  };

  const { data, error, isLoading } = useSWR("/kegiatan", fetcher);
  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <div className="flex h-screen">
        <SidebarSkeleton />
        <main className="flex-1 overflow-y-auto">
          <Card className="m-6">
            <CardContent className="p-6">
              <TableArtikelSkeleton />
            </CardContent>
          </Card>
        </main>
      </div>
    );
  return (
    <AdminLayout>
      <TableKegiatanDesa data={data} columns={columns} />
    </AdminLayout>
  );
}
