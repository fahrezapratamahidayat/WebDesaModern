"use client";
import axios from "axios";
import AdminLayout from "../layouts/admin-layout";
import useSWR from "swr";
import SidebarSkeleton from "../skeletons/sidebar";
import { Card, CardContent } from "../ui/card";
import TableArtikelSkeleton from "../skeletons/table";
import TableGambarGaleri, { columns } from "../tables/table-galeri";

export default function AdminGaleriPage() {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);

  const { data, error } = useSWR("/api/galeri", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data)
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
      <TableGambarGaleri data={data} columns={columns} />
    </AdminLayout>
  );
}
