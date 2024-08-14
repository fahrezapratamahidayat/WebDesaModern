import { RoleGate } from "@/components/auth/role-gate";
import UMKMPage from "@/components/pages/admin-umkm";
import { Role } from "@prisma/client";
import React from "react";

export default function PageUmkm() {
  return (
    <RoleGate allowedRole={Role.Admin}>
      <UMKMPage />
    </RoleGate>
  );
}
