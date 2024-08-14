import { PrismaClient, GambarGaleri } from "@prisma/client";

const prisma = new PrismaClient()

export const createNewGaleri = async (
    gambarGaleri: { url: string; keterangan: string }[]
): Promise<GambarGaleri[]> => {
    try {
        const newGaleriEntries = await Promise.all(gambarGaleri.map(gambar =>
            prisma.gambarGaleri.create({
                data: {
                    url: gambar.url,
                    keterangan: gambar.keterangan || ""
                }
            })
        ));
        return newGaleriEntries;
    } catch (error) {
        console.error("Error creating galeri:", error);
        throw error;
    }
};

export const getGambarGaleri = async () => {
    try {
        const data = await prisma.gambarGaleri.findMany();
        if(!data || data.length === 0){
            return { data: [], message: "Tidak ada galeri yang ditemukan." };
        }
        return { data, message: "Berhasil mengambil data galeri." };
    } catch (error) {
        console.error("Error getting galeri:", error);
        throw error;
    }
}