"use client";
    import axios from "axios";
import AdminLayout from "../layouts/admin-layout";
import TableUMKM, { columns } from "../tables/table-umkm";
import useSWR, { useSWRConfig } from "swr";
import SidebarSkeleton from "../skeletons/sidebar";
import { Card, CardContent } from "../ui/card";
import TableArtikelSkeleton from "../skeletons/table";


export default function UMKMPage() {
  const { mutate } = useSWRConfig();
  const fetcher = async () => {
    const response = await axios.get("/api/umkm");
    return response.data.data;
  };

  const refreshData = () => {
    mutate("/umkm");
  };

  const { data, error, isLoading } = useSWR("/umkm", fetcher);
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
      <TableUMKM data={data} columns={columns} refreshData={refreshData} />
    </AdminLayout>
  );
}
