import { PrismaClient, GambarGaleri } from "@prisma/client";

const prisma = new PrismaClient();

interface GambarGaleriInput {
  blob: Buffer;
  keterangan: string;
}

export async function createNewGaleri(gambarGaleri: GambarGaleriInput[]) {
  const data = await prisma.gambarGaleri.createMany({
    data: gambarGaleri.map((gambar) => ({
      blob: gambar.blob,
      keterangan: gambar.keterangan,
    })),
  });
  return data;
}

export const getGambarGaleri = async () => {
  try {
    const data = await prisma.gambarGaleri.findMany();
    if (!data || data.length === 0) {
      return { data: [], message: "Tidak ada galeri yang ditemukan." };
    }
    return { data, message: "Berhasil mengambil data galeri." };
  } catch (error) {
    console.error("Error getting galeri:", error);
    throw error;
  }
};

export const updateGaleri = async (id: string, keterangan: string) => {
  try {
    const data = await prisma.gambarGaleri.findFirst({
      where: {
        id,
      },
    });
    if (!data) {
      return { essage: "Galeri tidak ditemukan." };
    }
    const updatedData = await prisma.gambarGaleri.update({
      where: {
        id,
      },
      data: {
        keterangan,
      },
    });
    return { message: "Galeri berhasil diperbarui." };
  } catch (error) {
    return { error: "Terjadi kesalahan pada server.", message: error };
  }
};

export const deleteGaleri = async (id: string) => {
    try {
        const data = await prisma.gambarGaleri.findFirst({
            where: {
                id,
            },
        });
        if (!data) {
            return { error: "Galeri tidak ditemukan." };
        }
        const deletedData = await prisma.gambarGaleri.delete({
            where: {
                id,
            },
        });
        return { data: deletedData, message: "Galeri berhasil dihapus." };
    } catch (error) {
        return { error: "Terjadi kesalahan pada server.", message: error };
    }
};
