import { RoleGate } from "@/components/auth/role-gate";
import AdminWisataPage from "@/components/pages/admin-wisata";
import { Role } from "@prisma/client";
import React from "react";

export default function PageUmkm() {
  return (
    <RoleGate allowedRole={Role.Admin}>
        <AdminWisataPage />
    </RoleGate>
  );
}
