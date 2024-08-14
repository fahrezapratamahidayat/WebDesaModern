import { RoleGate } from "@/components/auth/role-gate";
import AdminGaleriPage from "@/components/pages/admin-galeri";
import { Role } from "@prisma/client";
import React from "react";

export default function Page() {
  return (
    <RoleGate allowedRole={Role.Admin}>
      <AdminGaleriPage />
    </RoleGate>
  );
}
