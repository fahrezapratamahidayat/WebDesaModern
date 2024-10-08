'use client'
import { useCurrentRole } from "@/hooks/use-current-role";
import { Role } from "@prisma/client";
import { FormError } from "../form-error";
import { redirect } from "next/navigation";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: Role;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();
  if (role !== allowedRole) {
    return (
      <FormError message="You do not have permission to view this content!" />
    );
  }
  return <>{children}</>;
};