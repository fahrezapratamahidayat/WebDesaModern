// services/umkm.ts

import { PrismaClient, UMKM, GambarUMKM } from "@prisma/client";

const prisma = new PrismaClient();

export const getUMKM = async (): Promise<{ data: UMKM[] | null; message: string }> => {
    try {
        const data = await prisma.uMKM.findMany({
            include: { GambarUMKM: true },
        });
        if (!data || data.length === 0) {
            return { data: [], message: "Tidak ada UMKM yang ditemukan." };
        }
        return { data, message: "UMKM berhasil ditemukan." };
    } catch (error) {
        console.error("Error fetching UMKM:", error);
        throw error;
    }
};

export const getUMKMById = async (id: string): Promise<UMKM | null> => {
    try {
        const umkm = await prisma.uMKM.findUnique({
            where: { id },
            include: { GambarUMKM: true },
        });
        return umkm;
    } catch (error) {
        console.error("Error fetching UMKM by id:", error);
        throw error;
    }
};

export const createUMKM = async (
    data: Omit<UMKM, 'id' | 'createdAt' | 'updatedAt'>,
    gambarUMKM?: { url: string; keterangan?: string }[]
): Promise<UMKM> => {
    try {
        const newUMKM = await prisma.uMKM.create({
            data: {
                ...data,
                GambarUMKM: gambarUMKM ? {
                    create: gambarUMKM
                } : undefined
            },
            include: { GambarUMKM: true },
        });
        return newUMKM;
    } catch (error) {
        console.error("Error creating UMKM:", error);
        throw error;
    }
};

// export const updateUMKM = async (id: string, data: Partial<UMKM>): Promise<UMKM> => {
//     try {
//         const updatedUMKM = await prisma.uMKM.update({
//             where: { id },
//             data,
//             include: { GambarUMKM: true },
//         });
//         return updatedUMKM;
//     } catch (error) {
//         console.error("Error updating UMKM:", error);
//         throw error;
//     }
// };
export async function updateUMKM(id: string, data: any, newGambarUMKM: any[] = []) {
    try {
        const updatedUMKM = await prisma.uMKM.update({
            where: { id: id },
            data: {
                ...data,
                GambarUMKM: {
                    create: newGambarUMKM
                }
            },
            include: {
                GambarUMKM: true
            }
        });
        return updatedUMKM;
    } catch (error) {
        console.error("Error updating UMKM:", error);
        throw error;
    }
}

export const deleteUMKM = async (id: string) => {
    try {
        await prisma.gambarUMKM.deleteMany({
            where: {
                umkmId: id
            }
        });

        const deletedUMKM = await prisma.uMKM.delete({
            where: {
                id: id
            }
        });
        return { message: "UMKM berhasil dihapus." };
    } catch (error: any) {
        return { message: "Error deleting UMKM:", error: error.message };
    }
};