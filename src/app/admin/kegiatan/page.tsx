import { RoleGate } from "@/components/auth/role-gate";
import AdminArtikelPage from "@/components/pages/admin-artikel";
import AdminKegiatanPage from "@/components/pages/admin-kegiatan";
import { Role } from "@prisma/client";

export default function PageKegiatan() {
  return (
    <RoleGate allowedRole={Role.Admin}>
      <AdminArtikelPage />
    </RoleGate>
  );
}
