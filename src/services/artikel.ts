import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface artikel {
  judul: string;
  kategori: string;
  tanggal: Date;
  ringkasan: string;
  penulis: number;
  isi: string;
  urlArtikel: string;
  slug: string;
  error?: string;
  status: StatusArtikel;
}

type StatusArtikel = "Draft" | "Publikasi" | "Arsip";

type ArtikelResult =
  | {
      id: number;
      createdAt: Date;
      updatedAt: Date;
      judul: string;
      slug: string;
      isi: string;
      kategori: string;
      tanggal: Date;
      penulisId: number;
      ringkasan: string;
      gambarUrl: string | null;
      urlArtikel: string | null;
      status: StatusArtikel;
    }
  | {
      error: string;
    };

export async function getArtikels() {
  try {
    const data = await prisma.articleDesa.findMany({
      include: {
        penulis: {
          select: {
            id: true,
            nama: true,
          },
        },
      },
    });
    if (!data || data.length === 0) {
      return { data: [], message: "Tidak ada UMKM yang ditemukan." };
    }
    return { data, message: "artikel berhasil ditemukan." };
  } catch (error) {
    return {
      error: error,
    };
  }
}

export async function createArtikel(data: artikel): Promise<ArtikelResult> {
  try {
    const createArtikel = await prisma.articleDesa.create({
      data: {
        judul: data.judul,
        kategori: data.kategori,
        tanggal: data.tanggal,
        ringkasan: data.ringkasan,
        isi: data.isi,
        slug: data.slug,
        urlArtikel: data.urlArtikel,
        status: data.status,
        penulis: {
          connect: {
            id: data.penulis,
          },
        },
      },
    });
    return createArtikel;
  } catch (error: any) {
    if (error.code === "P2002" && error.meta?.target?.includes("slug")) {
      return {
        error:
          "Slug artikel sudah digunakan. Silakan gunakan slug yang berbeda.",
      };
    }
    console.error("Error creating article:", error);
    return {
      error: "Terjadi kesalahan saat membuat artikel.",
    };
  }
}

export async function getArtikelBySlug(slug: string) {
  try {
    const data = await prisma.articleDesa.findFirst({
      where: {
        slug,
      },
      include: {
        penulis: {
          select: {
            id: true,
            nama: true,
          },
        },
      },
    });
    if (!data) {
      return {
        error: "Artikel tidak ditemukan.",
      };
    }
    return { data, message: "Artikel berhasil ditemukan." };
  } catch (error) {
    return {
      error: "Terjadi kesalahan saat mencari artikel.",
    };
  }
}
