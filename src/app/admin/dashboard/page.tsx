import { RoleGate } from "@/components/auth/role-gate";
import AdminDashboardPage from "@/components/pages/admin-dashboard";
import { Role } from "@prisma/client";
import React from "react";

export default function Page() {
    return (
        <RoleGate allowedRole={Role.Admin}>
            <AdminDashboardPage />
        </RoleGate>
    );
}