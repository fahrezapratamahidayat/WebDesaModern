import { useSession } from "next-auth/react";

declare module "next-auth" {
    interface User {
        role?: string;
        nama: string;
    }
}

export const useCurrentRole = () => {
    const session = useSession()
    return session.data?.user?.role
}