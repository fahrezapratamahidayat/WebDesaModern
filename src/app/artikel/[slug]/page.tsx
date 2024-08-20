import Header from "@/components/headers/admin-header";
import MainLayout from "@/components/layouts/main-layout";
import ArtikelDetail from "@/components/pages/artikel-slug";
import React from "react";

interface PageProps {
  params: { slug: string };
}
export default function Page({ params }: PageProps) {
  const { slug } = params;

  return (
    <MainLayout>
      <Header />
      <ArtikelDetail slug={slug} />
    </MainLayout>
  );
}
