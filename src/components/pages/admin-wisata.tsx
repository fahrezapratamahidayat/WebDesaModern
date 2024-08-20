"use client";
import axios from "axios";
import AdminLayout from "../layouts/admin-layout";
import useSWR, { useSWRConfig } from "swr";
import SidebarSkeleton from "../skeletons/sidebar";
import { Card, CardContent } from "../ui/card";
import TableArtikelSkeleton from "../skeletons/table";
import TableWisata, { columns } from "../tables/table-wisata";

export default function AdminWisataPage() {
  const { mutate } = useSWRConfig();

  const fetcher = async () => {
    const response = await axios.get("/api/wisata");
    return response.data.data;
  };

  const refreshData = () => {
    mutate("/wisata");
  };
  const { data, error, isLoading } = useSWR("/wisata", fetcher);
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
        <TableWisata data={data} columns={columns} refreshData={refreshData} />
    </AdminLayout>
  );
}
