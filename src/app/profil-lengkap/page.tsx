import Header from "@/components/headers/admin-header";
import MainLayout from "@/components/layouts/main-layout";
import ProfilLengkapSection from "@/components/pages/profil-lengkap-page";
import React from "react";

export default function ProfilLengkapPage() {
  return (
    <MainLayout>
      <Header />
      <ProfilLengkapSection />
    </MainLayout>
  );
}
