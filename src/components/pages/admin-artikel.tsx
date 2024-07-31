"use client";
import axios from "axios";
import AdminLayout from "../layouts/admin-layout";
import TableArtikel, { columns } from "../tables/table-artikel";
import useSWR, { useSWRConfig } from "swr";

export default function AdminArtikelPage() {
  const { mutate } = useSWRConfig();

  const fetcher = async () => {
    const params = { statuskamar: "reserved" };
    const response = await axios.get("/api/artikel", {
      params,
    });
    return response.data;
  };

  const { data, error, isLoading } = useSWR("/rooms", fetcher);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <AdminLayout>
      <TableArtikel data={data} columns={columns} />
    </AdminLayout>
  );
}
