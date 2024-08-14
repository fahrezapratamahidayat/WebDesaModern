// services/umkm.ts

import { PrismaClient, UMKM, GambarUMKM } from "@prisma/client";
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';

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

export async function updateUMKM(id: string, data: any, newFiles: File[], deletedImageIds: string[]) {
    try {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'umkm');
      await mkdir(uploadDir, { recursive: true });
  
      const newGambarUMKM = await Promise.all(newFiles.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
  
        const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
        const filePath = path.join(uploadDir, fileName);
  
        await writeFile(filePath, buffer);
  
        return {
          url: `/uploads/umkm/${fileName}`,
          keterangan: `New Image`,
        };
      }));
  
      if (deletedImageIds.length > 0) {
        await prisma.gambarUMKM.deleteMany({
          where: {
            id: { in: deletedImageIds },
            umkmId: id
          }
        });
  
        for (const imageId of deletedImageIds) {
          const image = await prisma.gambarUMKM.findUnique({ where: { id: imageId } });
          if (image) {
            const filePath = path.join(process.cwd(), 'public', image.url);
            await unlink(filePath);
          }
        }
      }
  
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