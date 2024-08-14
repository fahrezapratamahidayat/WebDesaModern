import { PrismaClient, WisataDesa } from "@prisma/client";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function getWisata() {
  try {
    const data = await prisma.wisataDesa.findMany({
      include: {
        GambarWisataGaleri: true,
      },
    });
    return { data, message: "Wisata berhasil ditemukan." };
  } catch (error) {
    return { data: [], message: "Tidak ada wisata yang ditemukan." };
  }
}

export async function getWIsataById(id: string) {
  try {
    const data = await prisma.wisataDesa.findFirst({
      where: {
        id,
      },
    });
    if (!data) {
      return { data: [], message: "Tidak ada wisata yang ditemukan." };
    }

    return { data, message: "Wisata berhasil ditemukan." };
  } catch (error) {
    return { data: [], message: "Tidak ada wisata yang ditemukan." };
  }
}

export const createWisata = async (
  data: Omit<WisataDesa, "id" | "createdAt" | "updatedAt">,
  GambarWisataGaleri?: { url: string; keterangan?: string }[]
): Promise<WisataDesa> => {
  try {
    const newWisata = await prisma.wisataDesa.create({
      data: {
        ...data,
        GambarWisataGaleri: GambarWisataGaleri
          ? {
              create: GambarWisataGaleri,
            }
          : undefined,
      },
      include: { GambarWisataGaleri: true },
    });
    return newWisata;
  } catch (error) {
    console.error("Error creating Wisata:", error);
    throw error;
  }
};

export const deleteWisata = async (id: string) => {
  try {
    await prisma.gambarWisataGaleri.deleteMany({
      where: {
        wisataDesaId: id,
      },
    });

    const deletedWisata = await prisma.wisataDesa.delete({
      where: {
        id: id,
      },
    });
    return { message: "Wisata berhasil dihapus." };
  } catch (error: any) {
    return { message: "Error deleting Wisata:", error: error.message };
  }
};

export const updateWisata = async (
  id: string,
  data: any,
  newFiles: File[],
  deletedImageIds: string[]
) => {
  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads", "wisata");
    await mkdir(uploadDir, { recursive: true });

    const newGambarWisata = await Promise.all(
      newFiles.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileName = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
        const filePath = path.join(uploadDir, fileName);

        await writeFile(filePath, buffer);

        return {
          url: `/uploads/wisata/${fileName}`,
          keterangan: `New Image`,
        };
      })
    );

    if (deletedImageIds.length > 0) {
      await prisma.gambarWisataGaleri.deleteMany({
        where: {
          id: { in: deletedImageIds },
          wisataDesaId: id,
        },
      });

      for (const imageId of deletedImageIds) {
        const image = await prisma.gambarWisataGaleri.findUnique({
          where: { id: imageId },
        });
        if (image) {
          const filePath = path.join(process.cwd(), "public", image.url);
          await unlink(filePath);
        }
      }
    }

    const updatedWisata = await prisma.wisataDesa.update({
      where: { id: id },
      data: {
        ...data,
        GambarWisataGaleri: {
          create: newGambarWisata,
        },
      },
      include: {
        GambarWisataGaleri: true,
      },
    });

    return { message: "berhasila di perbarui", data: updatedWisata };
  } catch (error: any) {
    return { message: "gagal di perbarui", error: error.message, status: 500 };
  }
};
