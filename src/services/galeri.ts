import { PrismaClient, GambarGaleri } from "@prisma/client";

const prisma = new PrismaClient()

export const createNewGaleri = async (
    data: Omit<GambarGaleri, 'id' | 'createdAt' | 'updatedAt'>,
    GambarGaleri?: { url: string; keterangan?: string }[]
): Promise<GambarGaleri> => {
    try {
        const newGaleri = await prisma.gambarGaleri.create({
            data: {
                ...data,
            }
        });
        return newGaleri;
    } catch (error) {
        console.error("Error creating UMKM:", error);
        throw error;
    }
};