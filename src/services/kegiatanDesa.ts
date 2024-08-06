import { PrismaClient, KegiatanDesa, JenisKegiatan } from "@prisma/client";

const prisma = new PrismaClient();

export const getKegiatan = async (): Promise<{ data: KegiatanDesa[] | null, message: string }> => {
    try {
        const data = await prisma.kegiatanDesa.findMany();
        if (!data || data.length === 0) {
            return { data: [], message: "Tidak ada kegiatan yang ditemukan." };
        }
        return { data, message: "Kegiatan berhasil ditemukan." };
    } catch (error) {
        console.error("Error fetching kegiatan:", error);
        throw error;
    }
};

export const getKegiatanById = async (id: number): Promise<KegiatanDesa | null> => {
    try {
        const kegiatan = await prisma.kegiatanDesa.findUnique({
            where: { id },
        });
        return kegiatan;
    } catch (error) {
        console.error("Error fetching kegiatan by id:", error);
        throw error;
    }
};

export const createKegiatan = async (data: Omit<KegiatanDesa, 'id' | 'createdAt' | 'updatedAt'>): Promise<KegiatanDesa> => {
    try {
        const newKegiatan = await prisma.kegiatanDesa.create({
            data: {
                ...data,
                dibuat: new Date(),
            },
        });
        return newKegiatan;
    } catch (error) {
        console.error("Error creating kegiatan:", error);
        throw error;
    }
};

export const updateKegiatan = async (id: number, data: Partial<KegiatanDesa>): Promise<KegiatanDesa> => {
    try {
        const updatedKegiatan = await prisma.kegiatanDesa.update({
            where: { id },
            data,
        });
        return updatedKegiatan;
    } catch (error) {
        console.error("Error updating kegiatan:", error);
        throw error;
    }
};

export const deleteKegiatan = async (id: number): Promise<KegiatanDesa> => {
    try {
        const deletedKegiatan = await prisma.kegiatanDesa.delete({
            where: { id },
        });
        return deletedKegiatan;
    } catch (error) {
        console.error("Error deleting kegiatan:", error);
        throw error;
    }
};